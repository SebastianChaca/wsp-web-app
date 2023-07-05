import React, { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface SideBarItemNotificationsProps {
  notification: number;
}

const SideBarItemNotifications: FC<SideBarItemNotificationsProps> = ({
  notification,
}) => {
  if (notification) {
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
          {notification}
        </Text>
      </Flex>
    );
  }
  return null;
};

export default SideBarItemNotifications;
