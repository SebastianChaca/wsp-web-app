import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClient } from './interfaces/serverToclient';
import { JwtService } from '@nestjs/jwt';
import { Logger, UseGuards } from '@nestjs/common';
import { SocketAuthMiddleware } from 'src/api/auth/ws-jwt/ws.mw';
import { WsJwtGuard } from 'src/api/auth/ws-jwt/ws-jwt.guard';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/api/user/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PopulatedMessage } from './interfaces/message-populated.interface';

@WebSocketGateway({
  namespace: 'events',
  cors: true,
})
@UseGuards(WsJwtGuard)
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger: Logger;
  private loggedInUser: User;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server<any, ServerToClient>;

  async findUserAndUpdateOnlineStatus(token: string, online: boolean) {
    const { id } = this.jwtService.verify(token, {
      secret: this.configService.get('jwt.secret'),
    });
    const user = await this.userModel.findOneAndUpdate(
      {
        _id: id,
      },
      { online },
      { new: true },
    );
    this.loggedInUser = user.toObject();
    //TODO:notificar a los amigos
  }

  async handleConnection(client: Socket) {
    try {
      const token = client?.handshake?.query?.token as string;
      await this.findUserAndUpdateOnlineStatus(token, true);

      client.join(this.loggedInUser.id.toString());
    } catch (error) {
      client.disconnect();
      throw error;
    }
  }
  async handleDisconnect(client: Socket) {
    try {
      const token = client?.handshake?.query?.token as string;
      await this.findUserAndUpdateOnlineStatus(token, false);
      this.loggedInUser = null;
      client.disconnect();
    } catch (error) {
      client.disconnect();
      throw error;
    }
  }
  afterInit(client: Socket) {
    //TODO:agregar modelo de usuario
    client.use(
      SocketAuthMiddleware(
        this.jwtService,
        this.configService,
        this.userModel,
      ) as any,
    );
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  sendMessage(message: PopulatedMessage) {
    this.server.to(message.to.id.toString()).emit('personal-message', message);
  }
}
