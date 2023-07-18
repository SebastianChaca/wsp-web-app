import MeesageDropDown from './ChatMessage/components/MessageDropDown/MeesageDropDown';
import MessageContainer from './ChatMessage/components/Container/MessageContainer';
import MessageProvider from './ChatMessage/components/Provider/MessageProvider';
import MessageDate from './ChatMessage/components/ShowDate/MessageDate';
import MessageStatus from './ChatMessage/components/MessageStatus/MessageStatus';

export const Message = {
  Provider: MessageProvider,
  Container: MessageContainer,
  Date: MessageDate,
  Status: MessageStatus,
  DropDownOptions: MeesageDropDown,
};
