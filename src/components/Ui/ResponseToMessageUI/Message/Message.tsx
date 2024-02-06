import { FC } from 'react';
import { Text } from '@chakra-ui/react';

interface MessageProps {
  nameTo: string;
  message: string;
}

const Message: FC<MessageProps> = ({ nameTo, message }) => {
  return (
    <>
      <Text fontWeight={500} color="brand.primary">
        {nameTo}
      </Text>
      <Text color="message.responseTo" as="i">
        {message}
      </Text>
    </>
  );
};

export default Message;
