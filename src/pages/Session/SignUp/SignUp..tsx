import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import {
  ContainerBox,
  Header,
  FormContainer,
} from '../../../components/Session';
import { FormikInput, ErrorMessage } from '../../../components/FormComponents';
import { validationSchema } from '../SignIn/ValidationSchema';
import { fetchSignUp } from '../../../services/session/signUp';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.sessionSlice);
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
        >
          {({ isValid }) => (
            <Form>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormikInput label="name" name="name" type="text" />
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
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ContainerBox>
  );
};

export default SignUp;
