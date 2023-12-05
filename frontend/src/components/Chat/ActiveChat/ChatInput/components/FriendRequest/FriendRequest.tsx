import { FC } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import { AiOutlineCheckCircle, MdBlock } from 'react-icons/all';
import { useSocketContext } from '../../../../../../socket/SocketContext/SocketContext';
import { useAppSelector } from '../../../../../../redux/hooks';
import { aceptFriend } from '../../../../../../services/friends';

const FriendRequest: FC = () => {
  const { socket } = useSocketContext();
  const session = useAppSelector((state) => state.sessionSlice);
  const { isRequesting, uid } = useAppSelector(
    (state) => state.activeChatSlice
  );
  if (!isRequesting) {
    return null;
  }
  const handleAccept = async () => {
    try {
      if (uid) {
        // esta mal, hay que usar create async thunk asi actualiza en la ui del remitente
        await aceptFriend(uid);
      }
    } catch (error) {
      console.log(error);
    }
    // socket?.emit('update-friend-status', {
    //   friendId: uid,
    //   from: session.uid,
    //   status: 1,
    // });
  };
  const handleBlock = () => {
    socket?.emit('update-friend-status', {
      friendId: uid,
      from: session.uid,
      status: 2,
    });
  };
  return (
    <Flex
      justifyContent="center"
      borderTop="1px solid #c4c4c4"
      borderRadius="4px 4px 0px 0px"
      p="20px"
      w="100%"
      bg="message.in.bg"
    >
      <Box>
        <Text mb="10px">El Remitente no esta en tu lista de amigos</Text>
        <Flex justifyContent="center">
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
