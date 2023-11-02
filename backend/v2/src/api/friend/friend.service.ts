import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './entities/friend.entity';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class FriendService {
  private readonly logger = new Logger(Friend.name);
  constructor(
    @InjectModel(Friend.name)
    private readonly friendModel: Model<Friend>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createFriendDto: CreateFriendDto, user: User) {
    const { email } = createFriendDto;
    this.logger.log('Create friend');
    if (email === user.email) throw new BadRequestException('invalid email');
    try {
      const friend = await this.userModel.findOne({ email });
      if (!friend) throw new BadRequestException('invalid email');
      //TODO: chequear que no existar una fila con friendID y userId
      const createFriend = await this.friendModel.create({
        user: user.id,
        friend: friend.id,
      });
      return createFriend;
    } catch (error) {
      this.logger.error('Create friend error');
      throw error;
    }
  }

  findAll() {
    return `This action returns all friend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
