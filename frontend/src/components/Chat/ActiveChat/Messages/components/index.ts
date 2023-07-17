import MeesageDropDown from './ChatMessage/components/Container/MeesageDropDown';
import MessageContainer from './ChatMessage/components/MessageDropDown/MessageContainer';
import MessageProvider from './ChatMessage/components/Provider/MessageProvider';
import MessageShowDate from './ChatMessage/components/ShowDate/ChatMessageShowDate';
import MessageStatus from './ChatMessage/components/MessageStatus/MessageStatus';

export const Message = {
  Provider: MessageProvider,
  Container: MessageContainer,
  ShowDate: MessageShowDate,
  Status: MessageStatus,
  DropDownOptions: MeesageDropDown,
};
