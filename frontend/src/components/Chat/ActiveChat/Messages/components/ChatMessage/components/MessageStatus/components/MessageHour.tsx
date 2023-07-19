import { Text } from '@chakra-ui/react';
import { getHour } from '../../../../../../../../../utils/date';

const MessageHour = ({ date }: { date: string }) => {
  return (
    <Text fontSize="10px" mr="4px" color="black">
      {getHour(date)}
    </Text>
  );
};

export default MessageHour;
