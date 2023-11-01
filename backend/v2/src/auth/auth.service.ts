import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { hashSync, compareSync } from 'bcrypt';
import { User } from 'src/api/user/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  hasPassword(password: string) {
    return hashSync(password, 10);
  }
  comparePassword(password: string, user: User) {
    return compareSync(password, user.password);
  }
  getJwtToken(payload: JwtPayload) {
    //generar token
    return this.jwtService.sign(payload);
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  // findAll() {
  //   return `This action returns all auth`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
