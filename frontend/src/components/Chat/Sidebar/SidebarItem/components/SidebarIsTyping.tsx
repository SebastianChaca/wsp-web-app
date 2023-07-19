import React from 'react';
import { useSideBarContext } from './SideBarProvider';
import { IsTyping } from '../../../../Ui';

const SidebarIsTyping = () => {
  const { friend } = useSideBarContext();
  return <IsTyping isTyping={friend.isTyping} />;
};

export default SidebarIsTyping;
