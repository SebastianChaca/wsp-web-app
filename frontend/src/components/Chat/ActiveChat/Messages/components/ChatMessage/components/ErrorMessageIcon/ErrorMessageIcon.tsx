import { VscError } from 'react-icons/vsc';
import { Box } from '@chakra-ui/react';

import { useMessageContext } from '../Provider/MessageProvider';

const ErrorMessageIcon = () => {
  const { msg } = useMessageContext();
  if (msg.hasFailed) {
    return (
      <Box color="red.600" marginLeft="8px">
        <VscError />
      </Box>
    );
  }
  return null;
};

export default ErrorMessageIcon;
