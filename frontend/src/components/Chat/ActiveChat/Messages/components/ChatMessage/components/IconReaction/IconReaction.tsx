import { useEffect, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { messageUI } from '../../../../../../../../types/message/message';
import IconAnimation from './IconAnimation';

interface IconReactionProps {
  msg: messageUI;
}

const IconReaction = ({ msg }: IconReactionProps) => {
  const hasIcon = msg.iconReactions && msg.iconReactions[0]?.icon;
  const hasPrev = useRef(hasIcon);

  useEffect(() => {
    hasPrev.current = hasIcon;
  }, [hasIcon]);

  return (
    <Flex position="absolute" left={1} top={8}>
      {msg.iconReactions?.map((reaction) => (
        <IconAnimation
          icon={reaction.icon}
          key={reaction.id}
          hasPreviuosValue={hasPrev.current}
        />
      ))}
    </Flex>
  );
};

export default IconReaction;
