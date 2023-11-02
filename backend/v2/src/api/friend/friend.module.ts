import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { Message, MessageSchema } from '../message/entities/message.entity';
import { AuthModule } from '../auth/auth.module';
import { Friend, FriendSchema } from './entities/friend.entity';

@Module({
  controllers: [FriendController],
  providers: [FriendService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Friend.name, schema: FriendSchema },
    ]),
    AuthModule,
  ],
})
export class FriendModule {}
