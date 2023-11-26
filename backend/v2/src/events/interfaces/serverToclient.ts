import { PopulatedMessage } from './message-populated.interface';
import { UserStatus } from './user-status.interface';

export interface ServerToClient {
  'personal-message': (payload: PopulatedMessage) => void;
  'friend-online-status': (payload: UserStatus) => void;
}
