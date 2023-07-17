import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Box } from '@chakra-ui/react';
import { messageUI } from '../../../../../../../../types/message/message';

interface MessageContext {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}
interface MessageProviderProps {
  children?: ReactNode;
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
}

const ChatContext = createContext<MessageContext>({} as MessageContext);

const MessageProvider: FC<MessageProviderProps> = ({
  children,
  msg,
  isOutgoing,
  showDate,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const values = useMemo(() => {
    return {
      msg,
      isOutgoing,
      showDate,
      showDropDown,
      setShowDropDown,
    };
  }, [msg, isOutgoing, showDate, showDropDown]);
  return (
    <ChatContext.Provider value={values}>
      <Box overflowX="hidden">{children}</Box>
    </ChatContext.Provider>
  );
};
export const useChatMessagesContext = () => useContext(ChatContext);
export default MessageProvider;
