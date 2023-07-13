import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/all';
import { useChatMessagesContext } from './ChatMessageProvider';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const ChatMessageContainer = ({ children }: Props) => {
  const { isOutgoing } = useChatMessagesContext();
  return (
    <Flex
      w="100%"
      justifyContent={isOutgoing ? 'right' : 'left'}
      position="relative"
    >
      <Box
        py="8px"
        px="16px"
        verticalAlign="top"
        bg={isOutgoing ? 'message.out.bg' : 'message.in.bg'}
        color={isOutgoing ? 'message.out.color' : 'message.in.color'}
        borderRadius="3px"
        w="auto"
        my="10px"
        wordBreak="break-all"
      >
        {/* <Flex justifyContent="right"> */}
        <Box position="absolute" top={0} right={0}>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              rightIcon={<BiChevronDown size={20} />}
              variant="ghost"
            />

            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        {/* </Flex> */}
        {children}
      </Box>
    </Flex>
  );
};

export default ChatMessageContainer;
