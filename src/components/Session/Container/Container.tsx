import { Container, Stack } from '@chakra-ui/react';

interface Props {
  children: JSX.Element | JSX.Element[];
  maxW?: string;
}
const ContainerBox = ({ children, maxW = 'lg' }: Props) => {
  return (
    <Container
      maxW={maxW}
      py={{ base: '12', md: '24' }}
      px={{ base: '4', sm: '8' }}
    >
      <Stack spacing="8">{children}</Stack>
    </Container>
  );
};
export default ContainerBox;
