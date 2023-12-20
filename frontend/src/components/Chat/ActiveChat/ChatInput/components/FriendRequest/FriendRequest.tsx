import { FC, useState } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdBlock } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { aceptFriend, blockFriend } from '../../../../../../services/friends';
import { updateFriend } from '../../../../../../redux/friends/friendsSlice';
import useToastCustom from '../../../../../../hooks/useToastCustom';

const FriendRequest: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { errorToast } = useToastCustom();

  const { isRequesting, uid } = useAppSelector(
    (state) => state.activeChatSlice
  );
  if (!isRequesting) {
    return null;
  }
  const handleAccept = async () => {
    setLoading(true);
    try {
      if (uid) {
        const response = await aceptFriend(uid);
        dispatch(updateFriend(response));
      }
    } catch (error) {
      errorToast();
    } finally {
      setLoading(false);
    }
  };
  const handleBlock = async () => {
    setLoading(true);
    try {
      if (uid) {
        const response = await blockFriend(uid);
        dispatch(updateFriend(response));
      }
    } catch (error) {
      errorToast();
    } finally {
      setLoading(false);
    }
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
            isLoading={loading}
          >
            Bloquear
          </Button>
          <Button
            ml="5px"
            leftIcon={<AiOutlineCheckCircle />}
            variant="rounded"
            onClick={handleAccept}
            isLoading={loading}
          >
            OK
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FriendRequest;
