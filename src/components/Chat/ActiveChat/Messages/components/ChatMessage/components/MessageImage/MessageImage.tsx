import { useState } from 'react';
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react';

const MessageImage = ({ url }: { url?: string }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      {url && (
        <Flex
          justifyContent="right"
          cursor="pointer"
          position="relative"
          onClick={() => {
            setShowImageModal(true);
          }}
        >
          <Image src={url} w="300px" borderRadius="3px" marginBottom="4px" />
        </Flex>
      )}

      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
        <ModalOverlay />
        <ModalContent padding="30px" minW="40%">
          <ModalCloseButton />
          <Image
            src={url}
            objectFit="contain"
            borderRadius="3px"
            marginTop="10px"
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default MessageImage;
