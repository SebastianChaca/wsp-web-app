import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { formatDateSideBar } from '../../../../../utils/date';

interface SidebarItemDateProps {
  date: string;
}

const SidebarItemDate: FC<SidebarItemDateProps> = ({ date }) => {
  return (
    // TODO: logica de devolver 'ayer' dia, etc
    <Text fontSize="12px" fontWeight="600" color="gray.500" mt="5px">
      {formatDateSideBar(date)}
    </Text>
  );
};

export default SidebarItemDate;
