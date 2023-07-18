import { FC } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import { AiOutlineCheckCircle, MdBlock } from 'react-icons/all';
import { useSocketContext } from '../../../../../../socket/SocketContext/SocketContext';
import { useAppSelector } from '../../../../../../redux/hooks';

interface FriendRequestProps {
  isRequesting: boolean;
  activeChatId: string | null;
}
const FriendRequest: FC<FriendRequestProps> = ({
  isRequesting,
  activeChatId,
}) => {
  const { socket } = useSocketContext();
  const session = useAppSelector((state) => state.sessionSlice);
  if (!isRequesting) {
    return null;
  }
  const handleAccept = () => {
    socket?.emit('update-friend-status', {
      friendId: activeChatId,
      from: session.uid,
      status: 1,
    });
  };
  const handleBlock = () => {
    socket?.emit('update-friend-status', {
      friendId: activeChatId,
      from: session.uid,
      status: 2,
    });
  };
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
        <Text>El Remitente no esta en tu lista de amigos</Text>
        <Flex justifyContent="center" p="10px">
          <Button
            mr="5px"
            leftIcon={<MdBlock />}
            variant="rounded"
            onClick={handleBlock}
          >
            Bloquear
          </Button>
          <Button
            ml="5px"
            leftIcon={<AiOutlineCheckCircle />}
            variant="rounded"
            onClick={handleAccept}
          >
            OK
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FriendRequest;
