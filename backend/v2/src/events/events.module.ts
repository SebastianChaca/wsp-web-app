import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/api/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [EventsGateway, JwtService],
  exports: [EventsGateway],
  imports: [AuthModule],
})
export class EventsModule {}
