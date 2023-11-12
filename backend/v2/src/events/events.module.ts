import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
  imports: [AuthModule],
})
export class EventsModule {}
