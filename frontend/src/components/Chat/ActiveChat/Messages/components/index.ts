import ChatMessageContainer from './ChatMessage/components/ChatMessageContainer';
import ChatMessageProvider from './ChatMessage/components/ChatMessageProvider';
import ChatMessageShowDate from './ChatMessage/components/ChatMessageShowDate';
import MessageStatus from './ChatMessage/components/MessageStatus/MessageStatus';

export const ChatMessages = {
  Provider: ChatMessageProvider,
  Container: ChatMessageContainer,
  ShowDate: ChatMessageShowDate,
  Status: MessageStatus,
};
