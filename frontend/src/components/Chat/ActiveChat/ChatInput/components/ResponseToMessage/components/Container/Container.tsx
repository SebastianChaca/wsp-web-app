import { Box, Flex } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Box
      bg="gray.400"
      marginBottom="20px"
      padding="10px 20px"
      borderRadius="8px"
      position="relative"
    >
      <Flex justifyContent="space-between">{children}</Flex>
    </Box>
  );
};

export default Container;
