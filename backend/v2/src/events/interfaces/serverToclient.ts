import { Message } from 'src/api/message/entities/message.entity';

export interface ServerToClient {
  newMessage: (payload: Message) => void;
}
