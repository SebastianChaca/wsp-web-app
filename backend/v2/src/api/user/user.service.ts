import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;

      const user = await this.userModel.create({
        password: this.authService.hasPassword(password),
        ...rest,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all userssss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
