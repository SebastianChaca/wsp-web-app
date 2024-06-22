import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import './dropImage.css';
import DropImageOverlay from './components/DropImageOverlay';
import DropImageProvider from './context/DropImageContext';

interface Props {
  children: ReactNode;
}

const DropImage = ({ children }: Props) => {
  return (
    <DropImageProvider>
      {({ getRootProps, getInputProps }) => (
        <>
          <Flex
            flexDirection="column"
            flexGrow={1}
            margin="0px"
            {...getRootProps()}
          >
            <DropImageOverlay />

            <input {...getInputProps()} />
            {children}
          </Flex>
        </>
      )}
    </DropImageProvider>
  );
};

export default DropImage;
