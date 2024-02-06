import { Flex } from '@chakra-ui/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const ChatTopBarContainer = ({ children }: Props) => {
  return (
    <Flex
      borderBottom="1px solid #c4c4c4"
      margin="0px"
      padding="18px 16px 10px"
      minH="80px"
      bg="#E2E8F0"
      position="sticky"
      w="100%"
      top="0px"
      zIndex={1000}
    >
      {children}
    </Flex>
  );
};

export default ChatTopBarContainer;
