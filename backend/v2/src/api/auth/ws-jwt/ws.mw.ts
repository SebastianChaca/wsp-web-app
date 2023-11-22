import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/api/user/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

type SocketIOModdielware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  jwtService: JwtService,
  configService: ConfigService,
  userModel: Model<User>,
): SocketIOModdielware => {
  return async (client, next) => {
    try {
      const token = client?.handshake?.headers?.auth as string;
      const { id, iat } = jwtService.verify(token, {
        secret: configService.get('jwt.secret'),
      });
      const userDb = await userModel.findOne({ _id: id });
      if (new Date(iat) < userDb.passwordChangedAt)
        throw new UnauthorizedException('Password has changed');
      if (!userDb) throw new UnauthorizedException('Token invalid');
      if (!userDb.isActive) throw new UnauthorizedException('User inactive');

      next();
    } catch (error) {
      next(error);
    }
  };
};