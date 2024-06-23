import { FC } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import PhotoIcon from '../../PhotoIcon/PhotoIcon';

interface MessageProps {
  nameTo: string;
  message?: string | null;
  image?: string | ArrayBuffer | null | undefined;
}

const Message: FC<MessageProps> = ({ nameTo, message, image }) => {
  return (
    <Box>
      <Text fontWeight={500} color="brand.primary">
        {nameTo}
      </Text>
      <Flex alignItems="center">
        {image && (
          <Box marginRight="4px">
            <PhotoIcon />
          </Box>
        )}

        <Text color="message.responseTo" as="i">
          {message ?? 'Photo'}
        </Text>
      </Flex>
    </Box>
  );
};

export default Message;
