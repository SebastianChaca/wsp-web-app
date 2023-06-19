import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const FriendRequest: FC = () => {
  return (
    <Flex
      justifyContent="center"
      border="1px solid #c4c4c4"
      borderRadius="8px"
      p="10px"
      // position="absolute"
      w="100%"
    >
      <Text>El Remitente no esta en tu lista de contactos</Text>
    </Flex>
  );
};

export default FriendRequest;
