import ChatInput from './ActiveChat/ChatInput/ChatInput';
import UserTopBar from './Sidebar/UserTopBar/UserTopBar';
import ChatTopBar from './ActiveChat/ChatTopBar/ChatTopBar';
import SidebarUserList from './Sidebar/SidebarUserList/SiebarUserList';
import Messages from './ActiveChat/Messages/Messages';
import EmptyChat from './ActiveChat/EmptyChat/EmptyChat';

export const SideBar = {
  TopBar: UserTopBar,
  FriendsList: SidebarUserList,
  Messages,
};

export const ActiveChat = {
  Input: ChatInput,
  TopBar: ChatTopBar,
  Messages,
  EmptyState: EmptyChat,
};
