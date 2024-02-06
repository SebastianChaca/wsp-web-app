import { ReactNode, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children?: ReactNode;
}
const UserListContainer = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    return (
      <Box
        ref={ref}
        height="calc(100vh - 80px)"
        overflow="auto"
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
  }
);
UserListContainer.displayName = 'UserListContainer';
export default UserListContainer;
