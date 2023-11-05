import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { Message, MessageSchema } from '../message/entities/message.entity';
import { Friend, FriendSchema } from '../friend/entities/friend.entity';
import { FriendService } from '../friend/friend.service';
import { MessageService } from '../message/message.service';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
    UserService,
    AuthService,
    FriendService,
    MessageService,
  ],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Friend.name, schema: FriendSchema },
    ]),
  ],
})
export class SeedModule {}
