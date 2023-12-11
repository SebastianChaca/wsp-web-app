import { useEffect, useRef, useState, forwardRef, ForwardedRef } from 'react';
import ChatMessage from './components/ChatMessage/ChatMessage';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import MessagesContainer from './components/MessagesContainer/MessagesContainer';
import { Spinner } from '../../../Ui';
import { getMessages } from '../../../../services/messages';

const Messages = forwardRef(
  (
    { scrollIntoView }: { scrollIntoView: () => void },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { messages, messagesLoading, pagination, loadingPagination } =
      useAppSelector((state) => state.messagesSlice);
    const { uid } = useAppSelector((state) => state.sessionSlice);
    const activeChat = useAppSelector((state) => state.activeChatSlice);

    const chatListRef = useRef<HTMLDivElement>(null);
    const firstLoad = useRef(true);

    const [page, setPage] = useState(2);
    const dispatch = useAppDispatch();

    // TODO:esto choca con la paginacion, poner ref en componente padre entre input y lista de mensajes, cuando hago submit hacer el ref.current?.scrollIntoView()
    useEffect(() => {
      if (firstLoad.current) {
        firstLoad.current = false;
        scrollIntoView();
      }
    }, [scrollIntoView]);

    // useEffect(() => {
    //   chatListRef.current?.scrollTo({
    //     top: 500,
    //   });
    // }, [page]);

    // useEffect(() => {
    //   const chatListElement = chatListRef.current!;
    //   // const observer = new IntersectionObserver((entries) => {
    //   //   console.log(entries);
    //   //   if (
    //   //     entries[0].isIntersecting &&
    //   //     activeChat.id &&
    //   //     page <= pagination.totalPages &&
    //   //     !loadingPagination
    //   //   ) {
    //   //     setPage((prev) => prev + 1);
    //   //     dispatch(
    //   //       getMessages({
    //   //         id: activeChat.id,
    //   //         page: page + 1,
    //   //       })
    //   //     );
    //   //   }
    //   // });
    //   // if (chatListRef.current) {
    //   //   observer.observe(chatListRef.current);
    //   // }
    //   // return () => {
    //   //   if (chatListElement) {
    //   //     observer.unobserve(chatListElement);
    //   //   }
    //   // };
    //   const handleScroll = () => {
    //     const isNearTop = chatListElement.scrollTop === 0;

    //     if (
    //       isNearTop &&
    //       activeChat.id &&
    //       page <= pagination.totalPages &&
    //       !loadingPagination &&
    //       !firstLoad.current
    //     ) {
    //       setPage((prev) => prev + 1);
    //       dispatch(
    //         getMessages({
    //           id: activeChat.id,
    //           page: page + 1,
    //         })
    //       );
    //       chatListElement.scrollTo({ top: 100 });
    //     }
    //   };
    //   chatListElement.addEventListener('wheel', handleScroll);

    //   return () => {
    //     chatListElement.removeEventListener('wheel', handleScroll);
    //   };
    // }, [activeChat, dispatch, page, pagination.totalPages, loadingPagination]);

    return (
      <>
        <MessagesContainer ref={ref}>
          {messagesLoading ? (
            <Spinner size="lg" />
          ) : (
            messages.map((msg, index, arr) => {
              return (
                <div
                  key={msg.id || index}
                  // ref={index === arr.length - 1 ? ref : null}
                >
                  <ChatMessage
                    msg={msg}
                    isOutgoing={msg.from === uid}
                    showDate={msg.parseDate !== arr[index - 1]?.parseDate}
                  />
                </div>
              );
            })
          )}
          {/* <div ref={ref} /> */}
        </MessagesContainer>
      </>
    );
  }
);
Messages.displayName = 'Messages';
export default Messages;
