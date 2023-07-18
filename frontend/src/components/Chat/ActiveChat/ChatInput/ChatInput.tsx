import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Grid, GridItem } from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';
import useInputSocket from '../../../../socket/hooks/useInputSocket';

import useActiveTab from '../../../../hooks/useActiveTab';
import { FriendRequest, ResponseToMessage } from './components';

const ChatInput = () => {
  const [message, setMessage] = useState<string>('');
  const { messages } = useAppSelector((state) => state.chatSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const { setTypingEvent, submitEvent, seenEvent } = useInputSocket(message);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTabActive = useActiveTab();

  useEffect(() => {
    setMessage('');
    inputRef.current?.focus();
  }, [activeChat.uid]);

  useEffect(() => {
    // marcar mensaje como visto
    if (isTabActive) {
      seenEvent();
    }
  }, [activeChat.uid, messages.length, seenEvent, isTabActive]);

  useEffect(() => {
    // evento para saber si estoy escribiendo
    setTypingEvent();
  }, [message, setTypingEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length === 0) return;
    // mando mensaje por socket event
    submitEvent();
    setMessage('');
  };

  return (
    <Box borderTop=" 1px solid #c4c4c4" bg="message.in.bg" p="20px">
      <FriendRequest
        isRequesting={activeChat.isRequesting}
        activeChatId={activeChat.uid}
      />
      <ResponseToMessage message={activeChat.responseTo} />
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Escribe un mensaje aquí"
          ref={inputRef}
          variant="unstyled"
          bg="#E2E8F0"
          p="8px"
          value={message}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default ChatInput;
