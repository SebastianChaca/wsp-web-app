import { BsCheckAll } from 'react-icons/all';

interface Props {
  isOutgoing: boolean;
  seen: boolean;
  onSideBar?: boolean;
}
const MessageCheck = ({ isOutgoing, seen, onSideBar = false }: Props) => {
  const getCheckColor = (): string => {
    if (seen) {
      return 'blue';
    }
    if (onSideBar && !seen) {
      return 'brand.gray2';
    }
    return '#718096';
  };

  return <>{isOutgoing && <BsCheckAll color={getCheckColor()} />}</>;
};

export default MessageCheck;
