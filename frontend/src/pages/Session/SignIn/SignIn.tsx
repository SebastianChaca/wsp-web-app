import { Button, Checkbox, HStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import {
  ContainerBox,
  Header,
  FormContainer,
} from '../../../components/Session';

import { FormikInput, ErrorMessage } from '../../../components/FormComponents';

import { validationSchema } from './ValidationSchema';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchSignIn } from '../../../services/session/signIn';

function SignIn() {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.sessionSlice);

  return (
    <ContainerBox>
      <Header signIn />

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

              <HStack justify="space-between" mt="20px">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>

              <Button
                bg="#692b8f"
                color="white"
                type="submit"
                w="100%"
                mt="20px"
                disabled={!isValid || isLoading}
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
}

export default SignIn;
