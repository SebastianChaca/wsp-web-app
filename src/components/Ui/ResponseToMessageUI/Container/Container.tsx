import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Flex
      bg="brand.fadedBack"
      padding="10px 14px"
      borderRadius="8px"
      position="relative"
      justifyContent="space-between"
    >
      {children}
    </Flex>
  );
};

export default Container;
