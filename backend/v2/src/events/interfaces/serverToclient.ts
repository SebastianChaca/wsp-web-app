import { Message } from 'src/api/message/entities/message.entity';
import { PopulatedMessage } from './message-populated.interface';

export interface ServerToClient {
  'personal-message': (payload: PopulatedMessage) => void;
}
