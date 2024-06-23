import { Box } from '@chakra-ui/react';
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
      return 'black';
    }
    return '#718096';
  };

  return (
    <>
      {isOutgoing && (
        <Box color={getCheckColor()}>
          <BsCheck2All />
        </Box>
      )}
    </>
  );
};

export default MessageCheck;
