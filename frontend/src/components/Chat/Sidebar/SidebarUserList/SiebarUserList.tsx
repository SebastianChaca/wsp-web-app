import SidebarItem from '../SidebarItem/SidebarItem';
import { useAppSelector } from '../../../../redux/hooks';
import { UserListContainer } from './components';
import { Spinner } from '../../../Ui';

const SidebarUserList = () => {
  const { friends, friendsLoading } = useAppSelector(
    (state) => state.chatSlice
  );

  return (
    <UserListContainer>
      {friendsLoading ? (
        <Spinner padding="20px" />
      ) : (
        friends.map((friend) => <SidebarItem key={friend.id} friend={friend} />)
      )}
    </UserListContainer>
  );
};

export default SidebarUserList;
