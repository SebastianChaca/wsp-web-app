import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const IconAnimation = ({
  icon,
  hasPreviuosValue,
}: {
  icon: string;
  hasPreviuosValue: string | undefined;
}) => {
  const isFirstRender = useRef(true);
  const prevCountRef = useRef('');
  const [activeAnimation, setActiveAnimation] = useState({
    scale: hasPreviuosValue ? 1 : 0,
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      setActiveAnimation({ scale: 0 });

      prevCountRef.current = icon;
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
