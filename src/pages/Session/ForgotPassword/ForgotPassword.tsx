import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import {
  ContainerBox,
  Header,
  FormContainer,
} from '../../../components/Session';
import { FormikInput, ErrorMessage } from '../../../components/FormComponents';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { validationSchema } from './validationSchema';

import { forgotPassword } from '../../../services/session';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, forgotPasswordMessage } = useAppSelector(
    (state) => state.sessionSlice
  );

  if (forgotPasswordMessage) {
    return (
      <ContainerBox maxW="100%">
        <Header
          headingText="We've sent a password recovery email to your inbox"
          text="Please check your email and follow the instructions to reset your password."
        />
      </ContainerBox>
    );
  }
  return (
    <ContainerBox>
      <Header
        headingText="Retrieve Password"
        text="Have an account ?"
        buttonText="Sign in"
      />

      <FormContainer>
        <Formik
          initialValues={{
            email: '',
          }}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            dispatch(forgotPassword(values));
          }}
        >
          {({ isValid }) => (
            <Form>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormikInput label="Email" name="email" type="text" />

              <Button
                bg="#692b8f"
                color="white"
                type="submit"
                w="100%"
                mt="20px"
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ContainerBox>
  );
};

export default ForgotPassword;
