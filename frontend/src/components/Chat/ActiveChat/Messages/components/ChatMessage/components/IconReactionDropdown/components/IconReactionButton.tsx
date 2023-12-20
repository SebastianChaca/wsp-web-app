import { Box, Fade } from '@chakra-ui/react';
import { LiaLaugh } from 'react-icons/lia';
import { useMessageContext } from '../../Provider/MessageProvider';
import IconReactionList from './IconReactionList';

const IconReactionButton = () => {
  const { isOutgoing, msg, showIconReactionDropDown } = useMessageContext();
  const showIcon = !msg.hasFailed && !msg.isLoading && showIconReactionDropDown;
  const bg = isOutgoing ? 'message.out.bg' : 'brand.gray2';

  return (
    <Fade in={showIcon}>
      <Box
        mr={isOutgoing ? '8px' : '0px'}
        ml={!isOutgoing ? '8px' : '0px'}
        bg={bg}
        p="6px"
        borderRadius="100%"
        cursor="pointer"
        position="relative"
      >
        <LiaLaugh />
      </Box>
    </Fade>
  );
};

export default IconReactionButton;
