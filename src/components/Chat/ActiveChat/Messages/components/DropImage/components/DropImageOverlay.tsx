import { Box, Text, Flex } from '@chakra-ui/react';
import { useDropImageContext } from '../context/DropImageContext';

const DropImageOverlay = () => {
  const { isDragAccept, isDragReject } = useDropImageContext();
  if (isDragAccept || isDragReject) {
    return (
      <Box
        className="fade-in-image"
        bg="rgba(69, 64, 64, 0.2)"
        boxShadow=" 0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(6px)"
        h="calc( 100% - 80px )"
        w="70%"
        position="absolute"
        zIndex={1000}
        p="30px"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          border="2px  dotted"
          borderColor={isDragAccept ? 'brand.primary' : 'brand.error'}
          borderRadius="10px"
          h="100%"
          w="100%"
        >
          {isDragAccept ? (
            <Text fontWeight={700} fontSize="24px">
              Drop image here
            </Text>
          ) : (
            <Text fontWeight={700} fontSize="24px" color="brand.error">
              Images only
            </Text>
          )}
        </Flex>
      </Box>
    );
  }

  return null;
};

export default DropImageOverlay;
