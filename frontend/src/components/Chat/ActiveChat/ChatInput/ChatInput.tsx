import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';
import useInputSocket from '../../../../socket/hooks/useInputSocket';

import useActiveTab from '../../../../hooks/useActiveTab';
import {
  FriendRequest,
  InputComponent,
  InputGrid,
  ResponseToMessage,
} from './components';
import { setResponseTo } from '../../../../redux/activeChat/activeChatSlice';

const ChatInput = () => {
  const [message, setMessage] = useState<string>('');
  const { friendId } = useAppSelector((state) => state.friendsSlice);
  const { messages } = useAppSelector((state) => state.messagesSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const dispatch = useDispatch();
  const { setTypingEvent, submitEvent, seenEvent } = useInputSocket(message);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTabActive = useActiveTab();

  useEffect(() => {
    setMessage('');

    const setFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    // TODO: this is wrong
    const timer = setTimeout(() => {
      requestAnimationFrame(setFocus);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [activeChat.uid, activeChat.responseTo?.to, friendId]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length === 0) return;
    await submitEvent();
    setMessage('');
    dispatch(setResponseTo(null));
  };

  if (activeChat.statusIsBlocked) {
    return null;
  }
  return (
    <Box position="sticky" w="100%" bottom={0} zIndex={1000}>
      <FriendRequest />
      <InputGrid>
        {/* agregar animation a responde to message */}
        <ResponseToMessage />
        <InputComponent
          message={message}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          ref={inputRef}
        />
      </InputGrid>
    </Box>
  );
};

export default ChatInput;
