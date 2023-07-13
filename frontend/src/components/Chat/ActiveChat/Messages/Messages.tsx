import { useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage/ChatMessage';
import { useAppSelector } from '../../../../redux/hooks';
import MessagesContainer from './components/MessagesContainer';

const Messages = () => {
  const { messages } = useAppSelector((state) => state.chatSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);

  return (
    <MessagesContainer>
      {messages.map((msg, index, arr) => {
        return (
          <ChatMessage
            msg={msg}
            key={msg.id}
            isOutgoing={msg.from === uid}
            showDate={msg.parseDate !== arr[index - 1]?.parseDate}
          />
        );
      })}

      <div ref={ref} />
    </MessagesContainer>
  );
};

export default Messages;
