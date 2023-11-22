import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/api/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/api/user/entities/user.entity';

@Module({
  providers: [EventsGateway, JwtService],
  exports: [EventsGateway],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
})
export class EventsModule {}
