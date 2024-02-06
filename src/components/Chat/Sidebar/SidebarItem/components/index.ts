import LastMessage from './LastMessage';
import SideBarItemContainer from './SideBarItemContainer';
import SideBarItemNotifications from './SideBarItemNotifications';
import SideBarNotificationSound from './SideBarNotificationSound';
import SideBarProvider from './SideBarProvider';
import SideBarUserInfoContainer from './SideBarUserInfoContainer';
import SideBarUsername from './SideBarUsername';
import SidebarAvatar from './SidebarAvatar';
import SidebarIsTyping from './SidebarIsTyping';
import SidebarItemDate from './SidebarItemDate';

export const Item = {
  Date: SidebarItemDate,
  Notification: SideBarItemNotifications,
  UserInfoContainer: SideBarUserInfoContainer,
  LastMessage,
  Container: SideBarItemContainer,
  NotificationSound: SideBarNotificationSound,
  Provider: SideBarProvider,
  IsTyping: SidebarIsTyping,
  Avatar: SidebarAvatar,
  UserName: SideBarUsername,
};
