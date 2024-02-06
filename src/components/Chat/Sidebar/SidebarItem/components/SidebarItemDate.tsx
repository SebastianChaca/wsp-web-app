import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { formatDateSideBar } from '../../../../../utils/date';
import { useSideBarContext } from './SideBarProvider';
import { capitalizeFirstLetter } from '../../../../../utils/capitalizeFirstLetter';

const SidebarItemDate: FC = () => {
  const { friend } = useSideBarContext();
  const date = friend.lastMessage?.date;
  if (date) {
    return (
      <Text fontSize="12px" fontWeight="600" color="gray.500" mt="5px">
        {capitalizeFirstLetter(formatDateSideBar(date))}
      </Text>
    );
  }
  return null;
};

export default SidebarItemDate;
