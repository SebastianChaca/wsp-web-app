import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
// import { verify } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }
    const client: Socket = context.switchToWs().getClient();
    const validateToken = (client: Socket) => {
      const token = client?.handshake?.headers?.auth as string;
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return payload;
    };
    try {
      validateToken(client);
    } catch (error) {
      throw new Error('error');
    }
  }
  // static validateToken(client: Socket) {
  //   const { authorization } = client.handshake.headers;
  //   const token: string = authorization.split(' ')[1];
  //   const payload = verify(token, process.env.JWT_SECRET_KEY);
  //   return payload;
  // }
}
