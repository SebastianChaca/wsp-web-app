import React from 'react';
import { Box, Fade } from '@chakra-ui/react';

interface Props {
  show: boolean;
}
const FadeTransparentOverlay = ({ show }: Props) => {
  return (
    <Fade
      in={show}
      // transition={{ enter: { delay: 0.03 }, exit: { delay: 0.01 } }}
    >
      <Box
        id="overlay"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(255, 255, 255, 0.25)"
        pointerEvents="auto"
        zIndex={1}
      />
    </Fade>
  );
};

export default FadeTransparentOverlay;
