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
import { Logger, UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({ namespace: 'events' })
//@UseGuards(WsJwtGuard)
export class EventsGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService) {}
  handleConnection(client: Socket) {
    try {
      const token = client?.handshake?.headers?.auth as string;
      this.jwtService.verify(token);
    } catch (error) {
      client.disconnect();
      return;
    }
  }
  @WebSocketServer()
  server: Server<any, ServerToClient>;

  // afterInit(client: Socket) {
  //   console.log(client.handshake.headers);
  //   try {
  //     const token = client?.handshake?.headers?.auth as string;
  //     this.jwtService.verify(token);
  //   } catch (error) {
  //     // client.disconnect();
  //     throw new UnauthorizedException('Access denied');
  //   }
  // }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  sendMessage(message: Message) {
    this.server.emit('newMessage', message);
  }
}
