import { useRef, useEffect, FormEventHandler, ChangeEventHandler } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
} from '@chakra-ui/react';
import { useDropImageContext } from '../../../Messages/components/DropImage/context/DropImageContext';
import ShowImageModalInput from './ShowImageModalInput';

type InputProps = {
  message: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
const ShowImageModal = ({
  message,
  handleChange,
  handleSubmit,
}: InputProps) => {
  const { showModal, setShowModal, preview, setPreview } =
    useDropImageContext();

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
    requestAnimationFrame(setFocus);
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
          minW="40%"
          h="50%"
          position="relative"
          justifyContent="center"
          alignItems="center"
          padding="20px"
        >
          <ModalCloseButton />

          <Image src={preview as string} objectFit="cover" h="80%" />
          <ShowImageModalInput
            ref={inputRef}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowImageModal;
