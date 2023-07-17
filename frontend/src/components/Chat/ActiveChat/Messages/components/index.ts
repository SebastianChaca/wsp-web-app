import MeesageDropDown from './ChatMessage/components/Container/MeesageDropDown';
import MessageContainer from './ChatMessage/components/MessageDropDown/MessageContainer';
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
