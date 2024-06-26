import { Form } from 'formik';
import React from 'react';
import { Button } from '@chakra-ui/react';
import FormikInput from '../../../../../../FormComponents/FormikInput/FormikInput';

interface ModalFormTypes {
  isValid: string | null;
  isLoading: boolean;
}
type Ref = HTMLInputElement;
const ModalForm = React.forwardRef<Ref, ModalFormTypes>(
  ({ isValid, isLoading }, ref) => {
    return (
      <Form>
        <FormikInput name="email" type="text" label="Email" ref={ref} />
        <Button
          bg="#692b8f"
          color="white"
          type="submit"
          w="100%"
          mt="20px"
          isDisabled={!isValid}
          isLoading={isLoading}
        >
          Send
        </Button>
      </Form>
    );
  }
);
ModalForm.displayName = 'ModalForm';
export default ModalForm;
