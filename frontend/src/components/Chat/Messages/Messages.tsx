import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage/ChatMessage';
import { useAppSelector } from '../../../redux/hooks';

const Messages = () => {
  const { messages } = useAppSelector((state) => state.chatSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);
  if (!messages.length) {
    return <h1>test</h1>;
  }
  return (
    <Box
      h="calc(100%-80px)"
      overflow="auto"
      px="15px"
      pt="90px"
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
        },
      }}
    >
      {messages.map((msg) => (
        <ChatMessage msg={msg} key={msg.id} isOutgoing={msg.from === uid} />
      ))}

      <div ref={ref} />
    </Box>
  );
};

export default Messages;
