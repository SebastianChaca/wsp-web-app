import { useRef, useEffect, FormEventHandler, ChangeEventHandler } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
  Text,
  Box,
} from '@chakra-ui/react';
import { useDropImageContext } from '../../../Messages/components/DropImage/context/DropImageContext';
import ShowImageModalInput from './ShowImageModalInput';

type InputProps = {
  message: string | null;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
const ShowImageModal = ({
  message,
  handleChange,
  handleSubmit,
}: InputProps) => {
  const {
    showModal,
    setShowModal,
    preview,
    setPreview,
    fileRejections,
    uploadingImageIsLoading,
  } = useDropImageContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    setShowModal(false);
    setPreview(null);
  };

  useEffect(() => {
    const setFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    setFocus();
  }, []);
  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={handleClose}
        closeOnOverlayClick={false}
        isCentered
        initialFocusRef={inputRef}
      >
        <ModalOverlay />
        <ModalContent
          justifyContent="center"
          alignItems="center"
          padding="40px 40px 20px 40px"
        >
          <ModalCloseButton />

          {fileRejections.length > 0 ? (
            <Box textAlign="center">
              <Text color="brand.error" fontWeight={700} fontSize="24px">
                {fileRejections[0].errors[0].message}
              </Text>
              <Text color="brand.error" fontSize="14px">
                Please, choose a new image.
              </Text>
            </Box>
          ) : (
            <>
              <Box h="100%">
                <Image
                  src={preview as string}
                  objectFit="contain"
                  height="100%"
                  borderRadius="3px"
                  marginBottom="10px"
                />
              </Box>

              <ShowImageModalInput
                isLoading={uploadingImageIsLoading}
                ref={inputRef}
                message={message}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowImageModal;
