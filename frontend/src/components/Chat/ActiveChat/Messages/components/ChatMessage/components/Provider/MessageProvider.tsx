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
import { useAppSelector } from '../../../../../../../../redux/hooks';
import { ActiveChat } from '../../../../../../../../types/activeChat/activeChat';

interface MessageContext {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  activeChat: ActiveChat;
  hasIconReaction: boolean;
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
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const hasIconReaction = !!msg.iconReactions && msg.iconReactions?.length > 0;

  const values = useMemo(() => {
    return {
      msg,
      isOutgoing,
      showDate,
      showDropDown,
      setShowDropDown,
      activeChat,
      hasIconReaction,
    };
  }, [msg, isOutgoing, showDate, showDropDown, activeChat, hasIconReaction]);
  return (
    <ChatContext.Provider value={values}>
      <Box overflowX="hidden">{children}</Box>
    </ChatContext.Provider>
  );
};
export const useMessageContext = () => useContext(ChatContext);
export default MessageProvider;
