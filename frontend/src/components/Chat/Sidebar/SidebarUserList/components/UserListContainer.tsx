import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const UserListContainer = ({ children }: Props) => {
  return (
    <Box
      height="100vh"
      overflow="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '10px',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default UserListContainer;
