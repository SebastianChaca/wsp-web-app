import { BsCheckAll } from 'react-icons/all';

interface Props {
  isOutgoing: boolean;
  seen: boolean;
}
const MessageCheck = ({ isOutgoing, seen }: Props) => {
  return <>{isOutgoing && <BsCheckAll color={seen ? 'blue' : 'white'} />}</>;
};

export default MessageCheck;
