import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface MessagesContainerProps {
  children?: ReactNode;
}

const MessagesContainer: FC<MessagesContainerProps> = ({ children }) => {
  return (
    <Box
      h="calc(100%-80px)"
      overflow="auto"
      px="15px"
      pt="90px"
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
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

export default MessagesContainer;
