import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../redux/hooks';

interface MessagesContainerProps {
  children?: ReactNode;
}

const MessagesContainer: FC<MessagesContainerProps> = ({ children }) => {
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const height = activeChat.isRequesting ? '288px' : '162px';
  return (
    <Box
      id="container"
      h={`calc(100vh - ${height})`}
      overflow="auto"
      px="15px"
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
