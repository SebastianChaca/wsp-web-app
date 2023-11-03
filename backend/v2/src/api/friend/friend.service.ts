import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './entities/friend.entity';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

      const relationExist = await this.friendModel.findOne({
        userId: user.id,
        friendId: friend.id,
      });
      if (relationExist) throw new BadRequestException('Relation alredy exist');

      const createFriend = await this.friendModel.create({
        userId: user.id,
        friendId: friend.id,
      });
      return createFriend;
    } catch (error) {
      this.logger.error('Create friend error');
      throw error;
    }
  }

  async findAllFriends(user: User, paginationDto: PaginationDto) {
    this.logger.log('search friends');
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      //TODO:falta agregar sorting de como traigo el listado
      const friends = await this.friendModel
        .find({ userId: user.id })
        .limit(limit)
        .skip(offset)
        .populate('friendId', '-roles')
        .select('-userId');

      return friends;
    } catch (error) {
      this.logger.error('search friends error');
      throw error;
    }
  }

  update(id: string, updateFriendDto: UpdateFriendDto) {
    this.logger.log('update friend');
    try {
      const friend = this.friendModel.findOneAndUpdate(
        { friendId: id },
        updateFriendDto,
        { new: true },
      );
      return friend;
    } catch (error) {
      this.logger.error('update friends error');
      throw error;
    }
  }
  //TODO:agregar delete pero solo para admins
}
