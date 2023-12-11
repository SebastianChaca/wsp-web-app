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

  const chatListRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(2);
  const dispatch = useAppDispatch();

  const lastMessage = messages[messages.length - 1]?.id;
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [lastMessage]);

  useEffect(() => {
    const chatListElement = chatListRef.current!;
    // const observer = new IntersectionObserver((entries) => {
    //   console.log(entries);
    //   if (
    //     entries[0].isIntersecting &&
    //     activeChat.id &&
    //     page <= pagination.totalPages &&
    //     !loadingPagination
    //   ) {
    //     setPage((prev) => prev + 1);
    //     dispatch(
    //       getMessages({
    //         id: activeChat.id,
    //         page: page + 1,
    //       })
    //     );
    //   }
    // });
    // if (chatListRef.current) {
    //   observer.observe(chatListRef.current);
    // }
    // return () => {
    //   if (chatListElement) {
    //     observer.unobserve(chatListElement);
    //   }
    // };
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
        chatListElement.scrollTo({ top: 50 });
      }
    };
    chatListElement.addEventListener('wheel', handleScroll);

    return () => {
      chatListElement.removeEventListener('wheel', handleScroll);
    };
  }, [activeChat, dispatch, page, pagination.totalPages, loadingPagination]);

  return (
    <>
      <MessagesContainer ref={chatListRef}>
        {messagesLoading ? (
          <Spinner size="lg" />
        ) : (
          messages.map((msg, index, arr) => {
            return (
              <ChatMessage
                key={msg.id || index}
                msg={msg}
                isOutgoing={msg.from === uid}
                showDate={msg.parseDate !== arr[index - 1]?.parseDate}
              />
            );
          })
        )}
        <div ref={ref} />
      </MessagesContainer>
    </>
  );
};

Messages.displayName = 'Messages';
export default Messages;
