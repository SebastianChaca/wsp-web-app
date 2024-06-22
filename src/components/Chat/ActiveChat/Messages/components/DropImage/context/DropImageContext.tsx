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

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
    if (acceptedFiles.length > 0) {
      setShowModal(true);
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
