import React from 'react';
import { UserName } from '../../../../UserComponents';
import { useSideBarContext } from './SideBarProvider';

const SideBarUsername = () => {
  const { friend } = useSideBarContext();
  return <UserName name={friend.user.name} />;
};

export default SideBarUsername;
