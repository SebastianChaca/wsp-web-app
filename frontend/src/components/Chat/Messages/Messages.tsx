import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage/ChatMessage';
import { useAppSelector } from '../../../redux/hooks';
import MessagesContainer from './components/MessagesContainer';
import FriendRequest from './FriendRequest/FriendRequest';

const Messages = () => {
  const { messages } = useAppSelector((state) => state.chatSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);

  return (
    <MessagesContainer>
      {messages.map((msg) => (
        <ChatMessage msg={msg} key={msg.id} isOutgoing={msg.from === uid} />
      ))}

      <div ref={ref} />
    </MessagesContainer>
  );
};

export default Messages;
