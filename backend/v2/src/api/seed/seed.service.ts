import { Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { users } from './data/user';
import { Friend } from '../friend/entities/friend.entity';
import { Message } from '../message/entities/message.entity';
import { messages } from './data/messages';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
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
      //TODO: esta mal, hay que hashear el pass
      const createUsers = users.map(
        async (user) => await this.userService.create(user),
      );
      const usersDB = await Promise.all(createUsers);
      const testUser = usersDB.find((user) => user.email === users[0].email);
      const findFriend = usersDB.find((user) => user.email === users[1].email);
      //adds friends to test@test.com user
      const addFriendsToTestUser = usersDB.map(async (user) => {
        if (user.email !== users[0].email) {
          return await this.friendModel.create({
            userId: testUser.id,
            friendId: user.id,
          });
        }
      });
      // ads test@test.com to friend1@test.com friend list
      const addTestUserToFriendList = usersDB.map(async (user) => {
        if (user.email === users[1].email) {
          return await this.friendModel.create({
            userId: user.id,
            friendId: testUser.id,
          });
        }
      });
      await Promise.all(addFriendsToTestUser);
      await Promise.all(addTestUserToFriendList);
      //TODO: crear seed de mensajes
      const seedMessages = messages();

      const createMessages = seedMessages.map(async (msg, index) => {
        console.log(msg);
        if (index % 2 === 0) {
          return await this.messageModel.create({
            to: findFriend.id,
            from: testUser.id,
            message: msg,
          });
        } else {
          return await this.messageModel.create({
            to: testUser.id,
            from: findFriend.id,
            message: msg,
          });
        }
      });
      await Promise.all(createMessages);
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
