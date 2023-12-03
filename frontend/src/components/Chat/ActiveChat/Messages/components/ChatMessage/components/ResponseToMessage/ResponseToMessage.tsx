import { ResponseTo } from '../../../../../../../Ui';
import { useMessageContext } from '../Provider/MessageProvider';

const ResponseToMessage = () => {
  const { msg } = useMessageContext();
  if (msg.responseTo) {
    return (
      <ResponseTo.Container>
        <ResponseTo.Decoration />
        <ResponseTo.Message
          nameTo={msg.responseTo.nameTo!}
          message={msg.responseTo.message!}
        />
      </ResponseTo.Container>
    );
  }
  return null;
};

export default ResponseToMessage;
