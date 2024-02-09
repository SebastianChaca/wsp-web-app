import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import {
  ContainerBox,
  Header,
  FormContainer,
} from '../../../components/Session';
import { FormikInput, ErrorMessage } from '../../../components/FormComponents';
import { validationSchema } from './ValidationSchema';
import { fetchSignUp } from '../../../services/session/signUp';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { cleanErrors } from '../../../redux/session/sessionSlice';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.sessionSlice);
  useEffect(() => {
    return () => {
      dispatch(cleanErrors());
    };
  }, [dispatch]);
  return (
    <ContainerBox>
      <Header
        text="Have an account ?"
        buttonText="Sign in"
        headingText="Create account"
      />
      <FormContainer>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
          }}
          onSubmit={async (values) => {
            dispatch(fetchSignUp(values));
          }}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ isValid }) => (
            <Form>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormikInput label="Name" name="name" type="text" />
              <FormikInput label="Email" name="email" type="text" />
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
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ContainerBox>
  );
};

export default SignUp;
