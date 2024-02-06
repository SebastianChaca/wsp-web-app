import { useToast } from '@chakra-ui/react';

const useToastCustom = () => {
  const toast = useToast();

  const successToast = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  };
  const errorToast = (
    title = 'An error ocurred',
    description = 'Please try again later.'
  ) => {
    toast({
      title,
      description,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return { successToast, errorToast };
};

export default useToastCustom;
