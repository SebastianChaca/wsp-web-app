import { Flex, Text } from '@chakra-ui/react';

const UserTopBar = () => {
  return (
    <>
      <Flex
        overflow="hidden"
        p="10px"
        borderBottom="1px solid #c4c4c4"
        h="80px"
        justifyContent="left"
        alignItems="center"
      >
        <Text fontSize="25px" fontWeight={700}>
          Chats
        </Text>
      </Flex>
    </>
  );
};

export default UserTopBar;
