import { FC } from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import { useMessageContext } from '../Provider/MessageProvider';
import { formatDateMessage } from '../../../../../../../../utils/date';

const MessageDate: FC = () => {
  const { showDate, msg } = useMessageContext();

  if (showDate) {
    return (
      <Flex justifyContent="center" my="5px">
        <Box borderRadius="8px" backgroundColor="brand.secondary" p="5px 8px">
          <Text fontSize="12" color="brand.backgroundWhite" fontWeight={700}>
            {msg.isLoading
              ? formatDateMessage(new Date().toString())
              : msg.parseDate}
          </Text>
        </Box>
      </Flex>
    );
  }
  return null;
};

export default MessageDate;
