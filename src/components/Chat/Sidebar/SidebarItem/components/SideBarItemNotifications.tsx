import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useSideBarContext } from './SideBarProvider';

const SideBarItemNotifications: FC = () => {
  const { friend } = useSideBarContext();
  if (friend.notifications) {
    return (
      <Flex
        bg="red.600"
        color="white"
        borderRadius="50%"
        w="20px"
        h="20px"
        justifyContent="center"
        alignItems="center"
        mt="4px"
      >
        <Text fontSize="10px" m="uto">
          {friend.notifications}
        </Text>
      </Flex>
    );
  }
  return null;
};

export default SideBarItemNotifications;
