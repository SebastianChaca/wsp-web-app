import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { messageUI } from '../../../../../../../types/message/message';

interface ChatMessageContext {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
}
interface ChatMessageProviderProps extends ChatMessageContext {
  children?: ReactNode;
}

const ChatContext = createContext<ChatMessageContext>({} as ChatMessageContext);

const ChatMessageProvider: FC<ChatMessageProviderProps> = ({
  children,
  msg,
  isOutgoing,
  showDate,
}) => {
  const values = useMemo(() => {
    return { msg, isOutgoing, showDate };
  }, [msg, isOutgoing, showDate]);
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};
export const useChatMessagesContext = () => useContext(ChatContext);
export default ChatMessageProvider;
