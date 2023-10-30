import { Injectable } from '@nestjs/common';

import { hashSync, compareSync } from 'bcrypt';
import { User } from 'src/api/user/entities/user.entity';
@Injectable()
export class AuthService {
  hasPassword(password: string) {
    return hashSync(password, 10);
  }
  comparePassword(password: string, user: User) {
    return compareSync(password, user.password);
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
