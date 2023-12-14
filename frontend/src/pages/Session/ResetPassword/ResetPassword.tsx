import { Button, HStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ContainerBox,
  Header,
  FormContainer,
} from '../../../components/Session';
import { FormikInput, ErrorMessage } from '../../../components/FormComponents';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { FORGORTPASSWORD, SESSION } from '../../../services/session/const';
import { forgotPassword, resetPassword } from '../../../services/session';
import { validationSchema } from './validationSchema';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.sessionSlice);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${SESSION}/${FORGORTPASSWORD}`);
  };
  //   if (forgotPasswordMessage) {
  //     return (
  //       <ContainerBox maxW="100%">
  //         <Header
  //           headingText="We've sent a password recovery email to your inbox"
  //           text="Please check your email and follow the instructions to reset your password."
  //         />
  //       </ContainerBox>
  //     );
  //   }
  return (
    <ContainerBox>
      <Header
        headingText="Reset Password"
        text="Have an account ?"
        buttonText="Sign in"
      />

      <FormContainer>
        <Formik
          initialValues={{
            password: '',
          }}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const obj = {
              token: searchParams.get('token') ?? '',
              password: values.password,
            };
            dispatch(resetPassword(obj));
          }}
        >
          {({ isValid }) => (
            <Form>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormikInput label="Password" name="password" type="text" />

              <Button
                bg="#692b8f"
                color="white"
                type="submit"
                w="100%"
                mt="20px"
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ContainerBox>
  );
};

export default ResetPassword;
