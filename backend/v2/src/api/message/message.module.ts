import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { Message, MessageSchema } from './entities/message.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    AuthModule,
  ],
})
export class MessageModule {}
