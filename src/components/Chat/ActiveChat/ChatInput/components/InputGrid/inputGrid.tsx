import { ReactNode } from 'react';
import { Grid } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../../redux/hooks';

interface inputGridProps {
  children: ReactNode;
  padding?: string;
  borderTop?: string;
}

const InputGrid = ({ children, padding, borderTop }: inputGridProps) => {
  const { isMobile } = useAppSelector((state) => state.uiSlice);
  return (
    <Grid
      gridTemplateColumns={isMobile ? '10% 85% 5%' : '5% 90% 5%'}
      borderTop={borderTop}
      p={padding}
      bg="message.in.bg"
      zIndex={100}
    >
      {children}
    </Grid>
  );
};

export default InputGrid;
