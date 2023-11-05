import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { users } from './data/user';
import { Friend } from '../friend/entities/friend.entity';
import { Message } from '../message/entities/message.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Friend.name)
    private readonly friendModel: Model<Friend>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}
  async create() {
    try {
      await this.emptyDB();
      await this.createSeed();
      return 'ok';
    } catch (error) {
      throw error;
    }
  }

  async createSeed() {
    try {
      const createUsers = users.map(
        async (user) => await this.userModel.create(user),
      );
      const usersDB = await Promise.all(createUsers);
      const findTestUser = usersDB.find(
        (user) => user.email === users[0].email,
      );
      const addFriendsToTestUser = usersDB.map(async (user) => {
        if (user.email !== users[0].email) {
          return await this.friendModel.create({
            userId: findTestUser.id,
            friendId: user.id,
          });
        }
      });
      await Promise.all(addFriendsToTestUser);
    } catch (error) {
      throw error;
    }
  }

  async emptyDB() {
    try {
      await this.userModel.deleteMany();
      await this.friendModel.deleteMany();
      await this.messageModel.deleteMany();
    } catch (error) {
      throw error;
    }
  }
}
