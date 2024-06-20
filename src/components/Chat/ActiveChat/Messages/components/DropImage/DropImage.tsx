import { Flex } from '@chakra-ui/react';
import { ReactNode, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './dropImage.css';
import ShowImageModal from './components/ShowImageModal';
import DropImageOverlay from './components/DropImageOverlay';

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
  } = useDropzone({ accept: { 'image/*': [] }, noClick: true });

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
      {isDragAccept && <DropImageOverlay />}

      <input {...getInputProps()} />
      {children}
    </Flex>
  );
};

export default DropImage;
