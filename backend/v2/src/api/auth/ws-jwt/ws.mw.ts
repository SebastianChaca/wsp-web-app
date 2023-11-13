import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type SocketIOModdielware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  jwtService: JwtService,
  configService: ConfigService,
): SocketIOModdielware => {
  return (client, next) => {
    try {
      const token = client?.handshake?.headers?.auth as string;
      jwtService.verify(token, {
        secret: configService.get('jwt.secret'),
      });
      //todo agregar logica de iat y buscar user

      next();
    } catch (error) {
      next(error);
    }
  };
};
