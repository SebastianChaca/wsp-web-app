import { FC } from 'react';
import { Text } from '@chakra-ui/react';

interface UsernameProps {
  name: string;
}

const Username: FC<UsernameProps> = ({ name }) => {
  return (
    <Text fontSize="18px" fontWeight="600">
      {name}
    </Text>
  );
};

export default Username;
