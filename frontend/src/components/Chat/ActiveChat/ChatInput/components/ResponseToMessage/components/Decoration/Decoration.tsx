import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

const Decoration: FC = () => {
  return (
    <Box
      borderTopLeftRadius="10px"
      borderBottomLeftRadius="10px"
      w="5px"
      bg="brand.primary"
      h="100%"
      top={0}
      left={0}
      position="absolute"
    />
  );
};

export default Decoration;
