import React from 'react';
import { useSideBarContext } from './SideBarProvider';
import { IsTyping } from '../../../../UserComponents';

const SidebarIsTyping = () => {
  const { friend } = useSideBarContext();
  return <IsTyping isTyping={friend.isTyping} />;
};

export default SidebarIsTyping;
