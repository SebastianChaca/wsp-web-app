import { Flex } from '@chakra-ui/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const RightContainer = ({ children }: Props) => {
  return (
    <Flex
      overflow="hidden"
      margin="0px"
      flexDirection="column"
      maxHeight="100vh"
    >
      {children}
    </Flex>
  );
};

export default RightContainer;
