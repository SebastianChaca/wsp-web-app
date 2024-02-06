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
  setShowIconReactionDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  showIconReactionDropDown: boolean;
  setIconReactionDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  openIconReactionDropDown: boolean;
  activeChat: ActiveChat;
  hasIconReaction: boolean;
  isLastElement: boolean;
}
interface MessageProviderProps {
  children?: ReactNode;
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
  isLastElement: boolean;
}

const ChatContext = createContext<MessageContext>({} as MessageContext);

const MessageProvider: FC<MessageProviderProps> = ({
  children,
  msg,
  isOutgoing,
  showDate,
  isLastElement,
}) => {
  // message options
  const [showDropDown, setShowDropDown] = useState(false);
  // side icon to open icon reaction list
  const [showIconReactionDropDown, setShowIconReactionDropDown] =
    useState(false);
  // open/close icon reaction menu
  const [openIconReactionDropDown, setIconReactionDropDown] = useState(false);
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
      isLastElement,
      setShowIconReactionDropDown,
      showIconReactionDropDown,
      openIconReactionDropDown,
      setIconReactionDropDown,
    };
  }, [
    msg,
    isOutgoing,
    showDate,
    showDropDown,
    activeChat,
    hasIconReaction,
    isLastElement,
    setShowIconReactionDropDown,
    showIconReactionDropDown,
    openIconReactionDropDown,
    setIconReactionDropDown,
  ]);
  return (
    <ChatContext.Provider value={values}>
      <Box overflow="hidden">{children}</Box>
    </ChatContext.Provider>
  );
};
export const useMessageContext = () => useContext(ChatContext);
export default MessageProvider;
