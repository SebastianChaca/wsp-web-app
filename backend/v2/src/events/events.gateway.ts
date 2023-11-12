import {
  SubscribeMessage,
  WebSocketGateway,
  WsException,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClient } from './interfaces/serverToclient';
import { Message } from 'src/api/message/entities/message.entity';

import { JwtService } from '@nestjs/jwt';
import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SocketAuthMiddleware } from 'src/api/auth/ws-jwt/ws.mw';
import { WsJwtGuard } from 'src/api/auth/ws-jwt/ws-jwt.guard';

@WebSocketGateway({ namespace: 'events' })
@UseGuards(WsJwtGuard)
export class EventsGateway implements OnGatewayConnection {
  private readonly logger: Logger;
  constructor(private readonly jwtService: JwtService) {}
  @WebSocketServer()
  server: Server<any, ServerToClient>;

  handleConnection(client: Socket) {
    // try {
    //   const token = client?.handshake?.headers?.auth as string;
    //   this.jwtService.verify(token);
    // } catch (error) {
    //   client.disconnect();
    //   return;
    // }
  }

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware(this.jwtService) as any);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  sendMessage(message: Message) {
    this.server.emit('newMessage', message);
  }
}
