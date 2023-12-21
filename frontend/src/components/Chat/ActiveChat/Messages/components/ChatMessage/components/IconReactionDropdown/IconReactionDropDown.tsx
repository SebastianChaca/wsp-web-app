import { ReactNode } from 'react';
import { useMessageContext } from '../Provider/MessageProvider';
import IconReactionMenu from './components/IconReactionMenu';

interface Props {
  children?: ReactNode;
}
const IconReactionDropDown = ({ children }: Props) => {
  const { isOutgoing } = useMessageContext();

  return (
    <>
      {isOutgoing && <IconReactionMenu />}
      {children}
      {!isOutgoing && <IconReactionMenu />}
    </>
  );
};

export default IconReactionDropDown;
