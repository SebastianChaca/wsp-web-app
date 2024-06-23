import { FC } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import PhotoIcon from '../../PhotoIcon/PhotoIcon';

interface MessageProps {
  nameTo: string;
  message?: string | null;
  image?: string | ArrayBuffer | null | undefined;
}

const Message: FC<MessageProps> = ({ nameTo, message, image }) => {
  console.log(!!message);
  return (
    <Box>
      <Text fontWeight={500} color="brand.primary">
        {nameTo}
      </Text>
      <Flex alignItems="center">
        {image && <PhotoIcon />}
        <Text color="message.responseTo" as="i" marginLeft="4px">
          {message ?? 'Photo'}
        </Text>
      </Flex>
    </Box>
  );
};

export default Message;
