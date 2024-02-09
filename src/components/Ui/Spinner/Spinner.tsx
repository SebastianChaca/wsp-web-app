import React, { FC } from 'react';
import { Spinner as SpinnerChakra, Flex } from '@chakra-ui/react';

interface SpinnerProps {
  padding?: string;
  size: string;
  height?: string;
}

const Spinner: FC<SpinnerProps> = ({ padding, size, height = '100%' }) => {
  return (
    <Flex justifyContent="center" alignItems="center" p={padding} h={height}>
      <SpinnerChakra
        thickness="3px"
        speed="0.65s"
        emptyColor="brand.gray"
        size={size}
        color="brand.primary"
      />
    </Flex>
  );
};

export default Spinner;
