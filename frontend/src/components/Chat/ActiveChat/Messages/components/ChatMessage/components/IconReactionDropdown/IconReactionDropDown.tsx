import { Box } from '@chakra-ui/react';
import React from 'react';
import { LiaLaugh } from 'react-icons/lia';
import { useMessageContext } from '../Provider/MessageProvider';

const IconReactionDropDown = () => {
  const { isOutgoing, msg, showIconReactionDropDown } = useMessageContext();
  if (
    !isOutgoing &&
    !msg.hasFailed &&
    !msg.isLoading &&
    showIconReactionDropDown
  ) {
    return (
      <Box ml="8px" bg="brand.gray2" p="4px" borderRadius="100%">
        <LiaLaugh />
      </Box>
    );
  }
  return null;
};

export default IconReactionDropDown;
