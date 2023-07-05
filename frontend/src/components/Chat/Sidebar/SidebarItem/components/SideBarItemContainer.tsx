import { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface SideBarItemContainerProps {
  children: ReactNode;
  selected: boolean;
  handleClick: () => void;
}

const SideBarItemContainer: FC<SideBarItemContainerProps> = ({
  children,
  selected,
  handleClick,
}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      _hover={{
        bg: selected ? 'gray.400' : 'gray.300',
      }}
      bg={selected ? 'gray.400' : 'transparent'}
      onClick={handleClick}
      cursor="pointer"
    >
      {children}
    </Flex>
  );
};

export default SideBarItemContainer;
