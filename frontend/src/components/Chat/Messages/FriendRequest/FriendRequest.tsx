import { FC } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import { AiOutlineCheckCircle, MdBlock } from 'react-icons/all';

interface FriendRequestProps {
  isRequesting: boolean;
}
const FriendRequest: FC<FriendRequestProps> = ({ isRequesting }) => {
  if (!isRequesting) {
    return null;
  }
  return (
    <Flex
      justifyContent="center"
      border="1px solid #c4c4c4"
      borderRadius="8px"
      p="10px"
      w="100%"
      mb="20px"
      bg="#E2E8F0"
    >
      <Box>
        <Text>El Remitente no esta en tu lista de contactos</Text>
        <Flex justifyContent="center" p="10px">
          <Button mr="5px" leftIcon={<MdBlock />} variant="rounded">
            Bloquear
          </Button>
          <Button
            ml="5px"
            leftIcon={<AiOutlineCheckCircle />}
            variant="rounded"
          >
            OK
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FriendRequest;
