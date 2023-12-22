import { BsCheck2All } from 'react-icons/bs';

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

  return (
    <>
      {isOutgoing && (
        <BsCheck2All
          color={getCheckColor()}
          style={{
            transition: 'color 1s',
          }}
        />
      )}
    </>
  );
};

export default MessageCheck;
