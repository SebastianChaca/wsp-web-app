import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
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
  const { messages } = useAppSelector((state) => state.chatSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const dispatch = useDispatch();
  const { setTypingEvent, submitEvent, seenEvent } = useInputSocket(message);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTabActive = useActiveTab();

  useEffect(() => {
    setMessage('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChat.uid, activeChat.responseTo?.to]);

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
    dispatch(setResponseTo(null));
  };

  return (
    <>
      <FriendRequest />
      <InputGrid>
        <ResponseToMessage />
        <InputComponent
          message={message}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          ref={inputRef}
        />
      </InputGrid>
    </>
  );
};

export default ChatInput;
