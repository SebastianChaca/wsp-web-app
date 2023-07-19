import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { messageUI } from '../../../../types/message/message';

interface MessageProps {
  message: messageUI;
}

const Message: FC<MessageProps> = ({ message }) => {
  return (
    <>
      <Text fontWeight={500} color="brand.primary">
        {message.nameTo}
      </Text>
      <Text color="message.responseTo" as="i">
        {message.message}
      </Text>
    </>
  );
};

export default Message;
