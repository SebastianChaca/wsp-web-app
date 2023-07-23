import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const EmptyChat = () => {
  return (
    <Flex justifyContent="center" alignItems="center" h="100%">
      <Text fontSize="40px">No chat selected</Text>
    </Flex>
  );
};

export default EmptyChat;
