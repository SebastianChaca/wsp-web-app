import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
function RightContainer({ children }: Props) {
  return (
    <Box overflow="hidden" margin="0px">
      {children}
    </Box>
  );
}

export default RightContainer;
