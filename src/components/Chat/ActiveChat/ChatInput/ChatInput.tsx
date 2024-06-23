import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import { Flex, GridItem, IconButton } from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';
import useInputSocket from '../../../../socket/hooks/useInputSocket';

import useActiveTab from '../../../../hooks/useActiveTab';
import {
  FriendRequest,
  InputComponent,
  InputGrid,
  InputMenuDropdown,
  ResponseToMessage,
} from './components';
import { setResponseTo } from '../../../../redux/activeChat/activeChatSlice';
import { useDropImageContext } from '../Messages/components/DropImage/context/DropImageContext';
import ShowImageModal from './components/ShowImageModal/ShowImageModal';

const ChatInput = () => {
  const [message, setMessage] = useState<string>('');
  const { friendId } = useAppSelector((state) => state.friendsSlice);
  const { messages } = useAppSelector((state) => state.messagesSlice);
  const {
    showModal,
    setShowModal,
    uploadedImage,
    setPreview,
    preview,
    uploadingImageIsLoading,
  } = useDropImageContext();
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const dispatch = useDispatch();
  const { setTypingEvent, submitEvent, seenEvent } = useInputSocket(
    message,

    uploadedImage?.id,
    preview
  );
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
    if ((message.length === 0 && !showModal) || uploadingImageIsLoading) return;
    if (showModal) {
      setShowModal(false);
    }
    await submitEvent();
    setPreview(null);
    setMessage('');
    dispatch(setResponseTo(null));
  };

  if (activeChat.statusIsBlocked) {
    return null;
  }
  if (showModal) {
    return (
      <ShowImageModal
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return (
    <>
      <FriendRequest />
      <InputGrid padding="20px 10px 0px 10px" borderTop=" 1px solid #c4c4c4">
        <GridItem />
        <ResponseToMessage />
      </InputGrid>

      <InputGrid padding="10px 10px 20px 10px">
        {/* agregar animation a responde to message */}
        <GridItem>
          <InputMenuDropdown />
        </GridItem>

        <GridItem>
          <InputComponent
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            ref={inputRef}
          />
        </GridItem>
      </InputGrid>
    </>
  );
};

export default ChatInput;
