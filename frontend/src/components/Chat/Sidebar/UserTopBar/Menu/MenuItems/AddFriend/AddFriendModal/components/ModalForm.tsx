import { Form } from 'formik';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { FormikInput } from '../../../../../../../../FormComponents';

interface ModalFormTypes {
  isValid: boolean;
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
          // TODO: cuando tengo un solo input funciona mal la validacion
          disabled={!isValid}
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
