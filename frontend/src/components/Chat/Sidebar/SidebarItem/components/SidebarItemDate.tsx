import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { formatDateSideBar } from '../../../../../utils/date';

interface SidebarItemDateProps {
  date: string;
}

const SidebarItemDate: FC<SidebarItemDateProps> = ({ date }) => {
  if (date) {
    return (
      <Text fontSize="12px" fontWeight="600" color="gray.500" mt="5px">
        {formatDateSideBar(date)}
      </Text>
    );
  }
  return null;
};

export default SidebarItemDate;
