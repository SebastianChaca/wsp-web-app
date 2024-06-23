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
  FileRejection,
} from 'react-dropzone';
import { uploadImage } from '../../../../../../../services/images/uploadImage';
import { imageServerResponse } from '../../../../../../../types/Images/image';
import useToastCustom from '../../../../../../../hooks/useToastCustom';

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
  fileRejections: FileRejection[];
  open: () => void;
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
  const { errorToast } = useToastCustom();

  const onDrop = useCallback(
    async (acceptedFiles: Array<File>, fileRejections: FileRejection[]) => {
      const file = new FileReader();

      file.onload = () => {
        setPreview(file.result);
      };

      if (acceptedFiles.length > 0) {
        file.readAsDataURL(acceptedFiles[0]);
      }

      if (acceptedFiles.length > 0 || fileRejections.length > 0) {
        setShowModal(true);
      }

      if (fileRejections.length === 0) {
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
          errorToast();
        } finally {
          setUploadingImageisLoading(false);
        }
      }
    },
    [errorToast]
  );
  const weigthValidation = (file: File) => {
    if (file.size > 2000000) {
      return {
        code: 'file-too-large',
        message: `File is larger than 2 mb`,
      };
    }
    return null;
  };
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
    open,
  } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.svg'] },
    noClick: true,
    onDrop,
    validator: weigthValidation,
  });

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
      fileRejections,
      open,
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
      fileRejections,
      open,
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
