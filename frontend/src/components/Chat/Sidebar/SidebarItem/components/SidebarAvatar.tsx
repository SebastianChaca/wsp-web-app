import React from 'react';
import { useSideBarContext } from './SideBarProvider';
import { Avatar } from '../../../../UserComponents';

const SidebarAvatar = () => {
  const { friend } = useSideBarContext();
  const { name, online } = friend.user;
  return (
    <Avatar
      online={online}
      name={name}
      hasBadge
      friendStatusApproved={friend.statusIsApproved}
    />
  );
};

export default SidebarAvatar;
