import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './entities/friend.entity';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Message } from '../message/entities/message.entity';
import { FriendApiResponse } from './interfaces/friendApiResponse.interface';
import { MessageService } from '../message/message.service';

@Injectable()
export class FriendService {
  private readonly logger = new Logger(Friend.name);
  constructor(
    @InjectModel(Friend.name)
    private readonly friendModel: Model<Friend>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly messageService: MessageService,
  ) {}

  async create(
    createFriendDto: CreateFriendDto,
    user: User,
  ): Promise<FriendApiResponse> {
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

      const populatedFriend = await this.friendModel.populate(createFriend, [
        { path: 'friendId', select: '-password' },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId, friendId, ...friendWithoutId } =
        populatedFriend.toObject();

      return {
        user: populatedFriend.friendId,
        ...friendWithoutId,
      };
    } catch (error) {
      this.logger.error('Create friend error');
      throw error;
    }
  }

  async getFriendById(
    friendIdParam: string,
    userId: string,
  ): Promise<Promise<{ lastMessage: Message } | FriendApiResponse>> {
    this.logger.log('search friend by id');
    try {
      const findFriend = await this.friendModel
        .findOne({
          userId,
          friendId: friendIdParam,
        })
        .populate('friendId', '-roles -password')
        .select('-userId');

      const findMessage = await this.messageService.getLastMessage(
        userId,
        friendIdParam,
      );
      const { friendId, ...rest } = findFriend.toObject();

      return {
        lastMessage: findMessage,
        user: friendId,
        ...rest,
      };
    } catch (error) {
      this.logger.error('search friend by id error');
      throw error;
    }
  }

  async findAllFriends(
    user: User,
    paginationDto: PaginationDto,
  ): Promise<({ lastMessage: Message } | FriendApiResponse)[]> {
    this.logger.log('search friends');
    const { limit = 1, offset = 0 } = paginationDto;

    try {
      const friends = await this.friendModel
        .find({ userId: user.id })
        .limit(limit)
        .skip(offset)
        .populate('friendId', '-roles -password')
        .select('-userId')
        .sort({ updatedAt: -1 });

      const addLastMessage = friends.map(async (f) => {
        if (typeof f !== 'string') {
          const friendPopulated = f.friendId as unknown;
          const friendIDD = (friendPopulated as User).id;
          const findMessage = await this.messageService.getLastMessage(
            user.id,
            friendIDD,
          );

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { friendId, userId, ...restFriend } = f.toObject();

          return {
            ...restFriend,
            user: friendId,
            lastMessage: findMessage,
          };
        }
      });
      return await Promise.all(addLastMessage);
    } catch (error) {
      this.logger.error('search friends error');
      throw error;
    }
  }
  //TODO:ver despues si deberia popular esto
  update(
    id: string,
    updateFriendDto: UpdateFriendDto,
    userId: string,
  ): Promise<Friend> {
    this.logger.log('update friend');
    try {
      const friend = this.friendModel.findOneAndUpdate(
        { friendId: id, userId },
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
