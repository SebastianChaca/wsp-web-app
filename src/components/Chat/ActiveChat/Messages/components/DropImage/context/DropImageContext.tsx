import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone';
import { uploadImage } from '../../../../../../../services/images/uploadImage';
import { imageServerResponse } from '../../../../../../../types/Images/image';

interface DropImageContextProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  acceptedFiles: File[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  preview: string | ArrayBuffer | null;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  uploadedImage: imageServerResponse | null;
  uploadingImageIsLoading: boolean;
}
interface DropImageProviderProps {
  children: ReactNode | ((values: DropImageContextProps) => ReactNode);
}
const DropImageContext = createContext<DropImageContextProps>(
  {} as DropImageContextProps
);
const DropImageProvider = ({ children }: DropImageProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [uploadedImage, setUploadedImage] =
    useState<imageServerResponse | null>(null);
  const [uploadingImageIsLoading, setUploadingImageisLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
    if (acceptedFiles.length > 0) {
      setShowModal(true);
    }

    try {
      setUploadingImageisLoading(true);
      setUploadedImage(
        await uploadImage({
          image: acceptedFiles[0],
          folder: 'messages',
        })
      );
    } catch (error) {
      // TODO: handle image error
      console.log(error);
    } finally {
      setUploadingImageisLoading(false);
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { 'image/*': [] }, noClick: true, onDrop });

  const values = useMemo(
    () => ({
      isDragAccept,
      isDragReject,
      acceptedFiles,
      showModal,
      setShowModal,
      preview,
      setPreview,
      getRootProps,
      getInputProps,
      uploadedImage,
      uploadingImageIsLoading,
    }),
    [
      isDragAccept,
      isDragReject,
      acceptedFiles,
      showModal,
      setShowModal,
      preview,
      setPreview,
      getRootProps,
      getInputProps,
      uploadedImage,
      uploadingImageIsLoading,
    ]
  );

  return (
    <DropImageContext.Provider value={values}>
      {typeof children === 'function' ? children(values) : children}
    </DropImageContext.Provider>
  );
};
export const useDropImageContext = () => useContext(DropImageContext);
export default DropImageProvider;
