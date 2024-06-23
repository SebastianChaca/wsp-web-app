import { Image } from '@chakra-ui/react';
import { ResponseTo } from '../../../../../../../Ui';
import { useMessageContext } from '../Provider/MessageProvider';

const ResponseToMessage = () => {
  const { msg } = useMessageContext();
  if (msg.responseTo?.nameTo && msg.responseTo?.message) {
    return (
      <ResponseTo.Container>
        <ResponseTo.Decoration />
        <ResponseTo.Message
          nameTo={msg.responseTo.nameTo}
          message={msg.responseTo.message}
        />
        <Image
          src={msg.responseTo.image as string}
          boxSize="50px"
          marginLeft="8px"
        />
      </ResponseTo.Container>
    );
  }
  return null;
};

export default ResponseToMessage;
