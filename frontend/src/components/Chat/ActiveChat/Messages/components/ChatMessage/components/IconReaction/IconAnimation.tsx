import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const IconAnimation = ({ icon }: { icon: string }) => {
  const isFirstRender = useRef(true);
  const [activeAnimation, setActiveAnimation] = useState({ scale: 1 });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setActiveAnimation({ scale: 0 });
    }
  }, [icon]);
  return (
    <motion.div
      key={icon}
      initial={activeAnimation}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Box
        px="3px"
        borderRadius="10px"
        bg="brand.gray2"
        border="1px solid"
        borderColor="brand.gray"
        mr="2px"
      >
        {icon}
      </Box>
    </motion.div>
  );
};

export default IconAnimation;
