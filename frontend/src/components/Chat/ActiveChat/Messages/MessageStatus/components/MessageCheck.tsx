import { BsCheckAll } from 'react-icons/all';

interface Props {
  isOutgoing: boolean;
  seen: boolean;
  onSideBar?: boolean;
}
const MessageCheck = ({ isOutgoing, seen, onSideBar = false }: Props) => {
  const getCheckColor = () => {
    if (seen) {
      return 'blue';
    }

    if (onSideBar) return 'brand.gray2';
    return 'brand.white';
  };

  return <>{isOutgoing && <BsCheckAll color={getCheckColor()} />}</>;
};

export default MessageCheck;
