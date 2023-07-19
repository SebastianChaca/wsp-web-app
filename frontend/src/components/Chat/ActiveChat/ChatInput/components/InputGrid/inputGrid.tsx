import { FC, ReactNode } from 'react';
import { Grid } from '@chakra-ui/react';

interface inputGridProps {
  children: ReactNode;
}

const inputGrid: FC<inputGridProps> = ({ children }) => {
  return (
    <Grid
      gridTemplateColumns="95% 5%"
      gridTemplateRows="auto auto"
      borderTop=" 1px solid #c4c4c4"
      bg="message.in.bg"
      p="20px"
    >
      {children}
    </Grid>
  );
};

export default inputGrid;
