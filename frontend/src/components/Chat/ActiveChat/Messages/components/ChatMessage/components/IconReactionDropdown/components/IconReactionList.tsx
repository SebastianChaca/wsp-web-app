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
      bg="brand.gray2"
      borderRadius="20px 20px"
      border="1px solid"
      borderColor="brand.gray"
      p="2px"
    >
      {emoticons.map((e) => (
        <Box
          key={Math.random()}
          p="4px"
          cursor="pointer"
          mx="2px"
          h="30px"
          w="30px"
          textAlign="center"
          _hover={{
            bg: 'brand.gray',
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
