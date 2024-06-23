import { useState } from 'react';
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';

const MessageImage = ({ url }: { url?: string }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      {url && (
        <Box
          cursor="pointer"
          position="relative"
          zIndex={10000}
          onClick={() => {
            setShowImageModal(true);
          }}
        >
          <Image src={url} boxSize="250px" objectFit="contain" />
        </Box>
      )}

      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
        <ModalOverlay />
        <ModalContent padding="30px" minW="40%">
          <ModalCloseButton />
          <Image src={url} objectFit="contain" boxSize="100%" />
        </ModalContent>
      </Modal>
    </>
  );
};

export default MessageImage;
