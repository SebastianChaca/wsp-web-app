import { useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage/ChatMessage';
import { useAppSelector } from '../../../../redux/hooks';
import MessagesContainer from './components/MessagesContainer/MessagesContainer';
import { Spinner } from '../../../Ui';

const Messages = () => {
  const { messages, messagesLoading } = useAppSelector(
    (state) => state.chatSlice
  );
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const ref = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);
  useEffect(() => {
    const chatListElement = chatListRef.current!;

    const handleScroll = () => {
      const isNearTop = chatListElement.scrollTop === 0;

      if (isNearTop) {
        console.log('top');
      }
    };
    chatListElement.addEventListener('scroll', handleScroll);

    return () => {
      chatListElement.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <MessagesContainer ref={chatListRef}>
      {messagesLoading ? (
        <Spinner />
      ) : (
        messages.map((msg, index, arr) => {
          return (
            <ChatMessage
              msg={msg}
              key={msg.id}
              isOutgoing={msg.from === uid}
              showDate={msg.parseDate !== arr[index - 1]?.parseDate}
            />
          );
        })
      )}

      <div ref={ref} />
    </MessagesContainer>
  );
};

export default Messages;
