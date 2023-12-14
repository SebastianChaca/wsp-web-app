import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Image,
  Flex,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import ImageLogo from '../../../assets/owl-svgrepo-com.svg';

interface Props {
  text: string;
  buttonText?: string;
  headingText: string;
  signIn?: boolean;
}
const Header = ({ text, buttonText, signIn, headingText }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (signIn) {
      navigate('/session/signup');
    } else {
      navigate('/session/signin');
    }
  };
  return (
    <Stack spacing="6">
      <Flex justifyContent="center">
        <Image src={ImageLogo} boxSize="120px" />
      </Flex>
      <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
        <Heading
          size={useBreakpointValue({
            base: 'xs',
            md: 'md',
            lg: 'lg',
          })}
        >
          {headingText}
        </Heading>
        <HStack spacing="1" justify="center">
          <Text color="muted">
            {/* {signIn ? "Don't have an account?" : 'Have an account ?'} */}
            {text}
          </Text>
          <Button variant="link" colorScheme="blue" onClick={handleNavigate}>
            {/* {signIn ? 'Sign up' : 'Sign in'} */}
            {buttonText}
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Header;
