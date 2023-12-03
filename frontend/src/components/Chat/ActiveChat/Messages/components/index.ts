import MeesageDropDown from './ChatMessage/components/MessageDropDown/MeesageDropDown';
import MessageContainer from './ChatMessage/components/Container/MessageContainer';
import MessageProvider from './ChatMessage/components/Provider/MessageProvider';
import MessageDate from './ChatMessage/components/ShowDate/MessageDate';
import MessageStatus from './ChatMessage/components/MessageStatus/MessageStatus';
import ErrorMessageIcon from './ChatMessage/components/ErrorMessageIcon/ErrorMessageIcon';
import ResponseToMessage from './ChatMessage/components/ResponseToMessage/ResponseToMessage';
import MessageText from './ChatMessage/components/MessageText/MessageText';

export const Message = {
  Provider: MessageProvider,
  Container: MessageContainer,
  Date: MessageDate,
  Status: MessageStatus,
  DropDownOptions: MeesageDropDown,
  ErrorIcon: ErrorMessageIcon,
  ResponseToMessage,
  MessageText,
};
