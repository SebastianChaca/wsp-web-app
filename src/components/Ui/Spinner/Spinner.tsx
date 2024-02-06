import React, { FC } from 'react';
import { Spinner as SpinnerChakra, Flex } from '@chakra-ui/react';

interface SpinnerProps {
  padding?: string;
  size: string;
}

const Spinner: FC<SpinnerProps> = ({ padding, size }) => {
  return (
    <Flex justifyContent="center" alignItems="center" p={padding} h="100%">
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
