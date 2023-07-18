import { FC } from 'react';
import { Box } from '@chakra-ui/react';

import { messageUI } from '../../../../../../types/message/message';
import { ResponseTo } from './components';

interface ResponseToMessageProps {
  message: messageUI | undefined;
}

const ResponseToMessage: FC<ResponseToMessageProps> = ({ message }) => {
  if (message?.message) {
    return (
      <ResponseTo.Container>
        <Box>
          <ResponseTo.Decoration />
          <ResponseTo.Message message={message} />
        </Box>
        <ResponseTo.CloseButton />
      </ResponseTo.Container>
    );
  }
  return null;
};

export default ResponseToMessage;
