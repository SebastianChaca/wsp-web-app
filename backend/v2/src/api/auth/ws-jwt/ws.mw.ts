import { Socket } from 'socket.io';
import { WsJwtGuard } from './ws-jwt.guard';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type SocketIOModdielware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  jwtService: JwtService,
): SocketIOModdielware => {
  return (client, next) => {
    try {
      //   const token = client?.handshake?.headers?.auth as string;
      //   jwtService.verify(token, {
      //     secret: process.env.JWT_SECRET_KEY,
      //   });
      //   WsJwtGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
