import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './entities/friend.entity';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Message } from '../message/entities/message.entity';

@Injectable()
export class FriendService {
  private readonly logger = new Logger(Friend.name);
  constructor(
    @InjectModel(Friend.name)
    private readonly friendModel: Model<Friend>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
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
      const friends = await this.friendModel
        .find({ userId: user.id })
        .limit(limit)
        .skip(offset)
        .populate('friendId', '-roles')
        .select('-userId')
        .sort({ updatedAt: 'desc' });

      const addLastMessage = friends.map(async (f) => {
        if (typeof f !== 'string') {
          const friendPopulated = f.friendId as unknown;
          const friendIDD = (friendPopulated as User).id;
          const findMessages = await this.messageModel
            .findOne({
              $or: [
                { from: user.id, to: friendIDD },
                { from: friendIDD, to: user.id },
              ],
            })
            .sort({ createdAt: 'desc' })
            .select('-responseTo')
            .limit(1);

          return {
            ...f.toObject(),
            lastMessage: findMessages?.toJSON(),
          };
        }
      });
      return await Promise.all(addLastMessage);
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
