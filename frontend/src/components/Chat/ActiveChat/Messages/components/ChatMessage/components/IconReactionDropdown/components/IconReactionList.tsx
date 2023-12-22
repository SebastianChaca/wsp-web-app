import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const IconReactionList = () => {
  const emoticons = [
    '❤️',
    '😂',
    '😍',
    '👍',
    '😡', // Add more emoticons as needed
  ];
  return (
    <Flex
      bg="rgba(255, 255, 255, 0.05)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      borderRadius="20px 20px"
      border="1px solid rgba(255, 255, 255, 0.20)"
      p="2px"
      position="relative"
      zIndex={1000}
    >
      {emoticons.map((e) => (
        <Box
          key={Math.random()}
          p="4px"
          cursor="pointer"
          mx="2px"
          h="40px"
          w="40px"
          fontSize="20px"
          textAlign="center"
          _hover={{
            bg: 'brand.gray2',
            borderRadius: '50%',
          }}
        >
          {e}
        </Box>
      ))}
    </Flex>
  );
};

export default IconReactionList;
