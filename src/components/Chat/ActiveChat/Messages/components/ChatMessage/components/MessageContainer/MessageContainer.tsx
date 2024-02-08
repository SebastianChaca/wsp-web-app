import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useMessageContext } from '../Provider/MessageProvider';
import { FadeTransparentOverlay } from '../../../../../../../Ui';

interface Props {
  children?: ReactNode;
}
const MessageContainer = ({ children }: Props) => {
  const {
    isOutgoing,
    setShowDropDown,
    msg,
    hasIconReaction,
    openIconReactionDropDown,
  } = useMessageContext();
  const getBackgroundColor = () => {
    if (msg.isLoading || msg.hasFailed) {
      return 'blackAlpha.100';
    }
    if (isOutgoing) {
      return 'message.out.bg';
    }
    return 'message.in.bg';
  };

  // const getColor = () => {
  //   if (msg.isLoading) {
  //     return 'red';
  //   }
  //   if (isOutgoing) {
  //     return 'message.out.color';
  //   }
  //   return 'message.in.color';
  // };

  return (
    <Box
      p="6px"
      verticalAlign="top"
      bg={getBackgroundColor()}
      borderRadius="3px"
      w="auto"
      my={hasIconReaction ? '20px' : '10px'}
      pb={hasIconReaction ? '12px' : '5px'}
      wordBreak="break-all"
      onMouseEnter={() => setShowDropDown(true)}
      onMouseLeave={() => setShowDropDown(false)}
      position="relative"
    >
      <FadeTransparentOverlay show={openIconReactionDropDown} />

      {children}
    </Box>
  );
};

export default MessageContainer;
