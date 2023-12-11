import { useRef, useState, useEffect } from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { UserListContainer } from './components';
import { Spinner } from '../../../Ui';
import { getFriends } from '../../../../services/friends';

const SidebarUserList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(2);
  const dispatch = useAppDispatch();

  const { friends, friendsLoading, pagination } = useAppSelector(
    (state) => state.friendsSlice
  );
  useEffect(() => {
    const element = ref.current!;
    const { totalPages, loadingPagination } = pagination;

    const handleScroll = () => {
      const scrollableHeight = element.scrollHeight - element.clientHeight;
      console.log(scrollableHeight);

      if (
        element.scrollTop >= scrollableHeight &&
        page <= totalPages &&
        !loadingPagination
      ) {
        setPage((prev) => prev + 1);
        dispatch(
          getFriends({
            page,
          })
        );
        element.scrollTo({ top: scrollableHeight * 0.8 });
      }
    };
    element?.addEventListener('wheel', handleScroll);

    return () => {
      element?.removeEventListener('wheel', handleScroll);
    };
  }, [page, pagination, dispatch]);
  return (
    <UserListContainer ref={ref}>
      {friendsLoading ? (
        <Spinner padding="20px" size="lg" />
      ) : (
        friends.map((friend) => <SidebarItem friend={friend} key={friend.id} />)
      )}
    </UserListContainer>
  );
};

export default SidebarUserList;
