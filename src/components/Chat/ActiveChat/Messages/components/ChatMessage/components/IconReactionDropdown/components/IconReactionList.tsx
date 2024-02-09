import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useMessageContext } from '../../Provider/MessageProvider';
import { useAppDispatch } from '../../../../../../../../../redux/hooks';
import { sendIconReaction } from '../../../../../../../../../services/messages';

const IconReactionList = () => {
  const emoticons = [
    '❤️',
    '😂',
    '😍',
    '👍',
    '😡', // Add more emoticons as needed
  ];
  const { setIconReactionDropDown, msg } = useMessageContext();
  const dispatch = useAppDispatch();
  const handleClick = (icon: string) => {
    setIconReactionDropDown((prev) => !prev);
    dispatch(sendIconReaction({ id: msg.id, iconReactions: icon }));
  };
  return (
    <Flex
      bg="rgba(255, 255, 255, 0.05)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(30px)"
      borderRadius="20px 20px"
      border="1px solid rgba(255, 255, 255, 0.20)"
      p="2px"
      position="relative"
      zIndex={100}
    >
      {emoticons.map((e) => (
        <Box
          onClick={() => handleClick(e)}
          key={Math.random()}
          p="4px"
          cursor="pointer"
          mx="2px"
          h="40px"
          w="40px"
          fontSize="20px"
          textAlign="center"
          _hover={{
            bg: 'rgba(196, 196, 196, 0.40)',
            borderRadius: '50%',
            backdropFilter: 'blur(7.5px)',
          }}
        >
          {e}
        </Box>
      ))}
    </Flex>
  );
};

export default IconReactionList;
