import { Flex } from '@chakra-ui/react';
import { MessageCheck, MessageHour } from './components';

interface Props {
  isOutgoing: boolean;
  date: string;
  seen: boolean;
}
const MessageStatus = ({ isOutgoing, date, seen }: Props) => {
  return (
    <Flex justifyContent="right">
      <MessageHour date={date} />
      <MessageCheck isOutgoing={isOutgoing} seen={seen} />
    </Flex>
  );
};

export default MessageStatus;
