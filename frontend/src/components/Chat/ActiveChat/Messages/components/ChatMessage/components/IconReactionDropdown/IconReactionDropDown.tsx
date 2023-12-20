import { ReactNode } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { useMessageContext } from '../Provider/MessageProvider';
import { IconReactionButton, IconReactionList } from './components';

interface Props {
  children?: ReactNode;
}
const IconReactionDropDown = ({ children }: Props) => {
  const { isOutgoing } = useMessageContext();

  return (
    <>
      {isOutgoing && (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<IconReactionButton />}
            bg="none"
            _active={{ bg: 'none' }}
          />
          <MenuList
            bg="none"
            shadow="0px"
            border="none"
            minWidth="100%"
            p="0px"
          >
            <IconReactionList />
          </MenuList>
        </Menu>
      )}
      {children}
      {/* {!isOutgoing && <IconReactionButton />} */}
    </>
  );
};

export default IconReactionDropDown;
