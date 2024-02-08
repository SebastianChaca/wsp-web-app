import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { useMessageContext } from '../Provider/MessageProvider';

interface Props {
  children?: ReactNode;
}
const MainContainer = ({ children }: Props) => {
  const { isLastElement, setShowIconReactionDropDown, isOutgoing } =
    useMessageContext();
  return (
    <Flex
      overflow="hidden"
      h="100%"
      mb={isLastElement ? '10px' : '0px'}
      onMouseEnter={() => setShowIconReactionDropDown(true)}
      onMouseLeave={() => setShowIconReactionDropDown(false)}
      w="100%"
      justifyContent={isOutgoing ? 'right' : 'left'}
      alignItems="center"
    >
      {children}
    </Flex>
  );
};

export default MainContainer;
