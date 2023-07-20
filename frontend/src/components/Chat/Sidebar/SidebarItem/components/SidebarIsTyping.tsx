import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSideBarContext } from './SideBarProvider';
import { IsTyping } from '../../../../Ui';

const SidebarIsTyping = () => {
  const { friend } = useSideBarContext();
  return (
    <Box mt="5px">
      <IsTyping isTyping={friend.isTyping} />
    </Box>
  );
};

export default SidebarIsTyping;
