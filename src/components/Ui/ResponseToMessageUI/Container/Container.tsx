import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Box
      bg="brand.fadedBack"
      padding="10px 14px"
      borderRadius="8px"
      position="relative"
    >
      {children}
    </Box>
  );
};

export default Container;
