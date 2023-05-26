import SidebarItem from '../SidebarItem/SidebarItem';
import { useAppSelector } from '../../../../redux/hooks';
import { UserListContainer } from './components';

const SidebarUserList = () => {
  const { friends } = useAppSelector((state) => state.chatSlice);

  if (!friends?.length) {
    return null;
  }

  return (
    <UserListContainer>
      {friends.map((friend) => (
        <SidebarItem key={friend.uid} friend={friend} />
      ))}
    </UserListContainer>
  );
};

export default SidebarUserList;
