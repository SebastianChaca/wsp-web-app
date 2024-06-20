import { Box, Text, Flex } from '@chakra-ui/react';
import { ReactNode, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './dropImage.css';
import ShowImageModal from './ShowImageModal';

interface Props {
  children: ReactNode;
}

const DropImage = ({ children }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { 'image/*': [] } });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setShowModal(true);
    }
  }, [acceptedFiles.length]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Flex flexDirection="column" flexGrow={1} margin="0px" {...getRootProps()}>
      <ShowImageModal isOpen={showModal} onClose={handleClose} />
      {isDragAccept && (
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
            borderColor="brand.primary"
            borderRadius="10px"
            h="100%"
            w="100%"
          >
            <Text fontWeight={700} fontSize="24px">
              Drop image here
            </Text>
          </Flex>
        </Box>
      )}

      <input {...getInputProps()} />
      {children}
    </Flex>
  );
};

export default DropImage;
