import { Flex } from '@chakra-ui/react';
import { messageUI } from '../../../../../../../../types/message/message';
import { useMessageContext } from '../Provider/MessageProvider';
import IconAnimation from './IconAnimation';

interface IconReactionProps {
  msg: messageUI;
}

const IconReaction = ({ msg }: IconReactionProps) => {
  const { hasIconReaction } = useMessageContext();

  if (hasIconReaction) {
    return (
      <Flex position="absolute" left={1} top={8}>
        {msg.iconReactions?.map((reaction) => (
          <IconAnimation icon={reaction.icon} key={reaction.id} />
        ))}
      </Flex>
    );
  }

  return null;
};

export default IconReaction;
