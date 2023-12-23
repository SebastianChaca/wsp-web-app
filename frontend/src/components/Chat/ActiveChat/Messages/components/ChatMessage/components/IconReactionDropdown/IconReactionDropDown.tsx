import { ReactNode, useEffect } from 'react';
import { useMessageContext } from '../Provider/MessageProvider';
import IconReactionMenu from './components/IconReactionMenu';

interface Props {
  children?: ReactNode;
}
const IconReactionDropDown = ({ children }: Props) => {
  const { isOutgoing, openIconReactionDropDown, setIconReactionDropDown } =
    useMessageContext();
  useEffect(() => {
    const handleScroll = () => {
      if (openIconReactionDropDown) {
        setIconReactionDropDown((prev) => !prev);
      }
    };

    // Attach the event listener with the { passive: true } option
    window.addEventListener('wheel', handleScroll, { passive: true });

    // Detach the event listener when the component is unmounted
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [setIconReactionDropDown, openIconReactionDropDown]);

  return (
    <>
      {isOutgoing && <IconReactionMenu />}
      {children}
      {!isOutgoing && <IconReactionMenu />}
    </>
  );
};

export default IconReactionDropDown;
