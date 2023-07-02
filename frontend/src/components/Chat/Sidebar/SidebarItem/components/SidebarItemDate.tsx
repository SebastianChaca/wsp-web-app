import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';

interface SidebarItemDateProps {
  date: string;
}

const SidebarItemDate: FC<SidebarItemDateProps> = ({ date }) => {
  return (
    <Text fontSize="12px" fontWeight="600" color="gray.500" mt="5px">
      {date}
    </Text>
  );
};

export default SidebarItemDate;
