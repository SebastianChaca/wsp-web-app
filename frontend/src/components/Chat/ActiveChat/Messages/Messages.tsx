import { useEffect, useRef, useState } from 'react';
import ChatMessage from './components/ChatMessage/ChatMessage';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import MessagesContainer from './components/MessagesContainer/MessagesContainer';
import { Spinner } from '../../../Ui';
import { getMessages } from '../../../../services/messages';

const Messages = () => {
  const { messages, messagesLoading, pagination, loadingPagination } =
    useAppSelector((state) => state.messagesSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);

  const ref = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(2);
  const dispatch = useAppDispatch();

  // TODO:esto choca con la paginacion
  // useEffect(() => {
  //   ref.current?.scrollIntoView();
  // }, [messages]);

  useEffect(() => {
    const chatListElement = chatListRef.current!;

    const handleScroll = () => {
      const isNearTop = chatListElement.scrollTop === 0;

      if (
        isNearTop &&
        activeChat.id &&
        page <= pagination.totalPages &&
        !loadingPagination
      ) {
        setPage((prev) => prev + 1);
        dispatch(
          getMessages({
            id: activeChat.id,
            page: page + 1,
          })
        );
      }
    };
    chatListElement.addEventListener('wheel', handleScroll);

    return () => {
      chatListElement.removeEventListener('wheel', handleScroll);
    };
  }, [activeChat, dispatch, page, pagination.totalPages, loadingPagination]);
  return (
    <MessagesContainer ref={chatListRef}>
      {messagesLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {messages.map((msg, index, arr) => {
            return (
              <ChatMessage
                msg={msg}
                key={msg.id || index}
                isOutgoing={msg.from === uid}
                showDate={msg.parseDate !== arr[index - 1]?.parseDate}
              />
            );
          })}
        </>
      )}

      <div ref={ref} />
    </MessagesContainer>
  );
};

export default Messages;
