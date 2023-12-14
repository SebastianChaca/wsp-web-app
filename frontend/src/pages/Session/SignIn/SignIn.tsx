import { Button, HStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  ContainerBox,
  Header,
  FormContainer,
} from '../../../components/Session';
import { FormikInput, ErrorMessage } from '../../../components/FormComponents';

import { validationSchema } from './ValidationSchema';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchSignIn } from '../../../services/session/signIn';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.sessionSlice);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/session/forgotpassword');
  };
  return (
    <ContainerBox>
      <Header
        headingText="Log in to your account"
        signIn
        text="Don't have an account?"
        buttonText="Sign up"
      />

      <FormContainer>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            dispatch(fetchSignIn(values));
          }}
          validationSchema={validationSchema}
        >
          {({ isValid }) => (
            <Form>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormikInput label="Email" name="email" type="text" />
              <FormikInput label="Password" name="password" type="text" />

              <HStack justify="right" mt="20px">
                <Button
                  variant="link"
                  colorScheme="blue"
                  size="sm"
                  onClick={handleNavigate}
                >
                  Forgot password?
                </Button>
              </HStack>

              <Button
                bg="#692b8f"
                color="white"
                type="submit"
                w="100%"
                mt="20px"
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ContainerBox>
  );
};

export default SignIn;
