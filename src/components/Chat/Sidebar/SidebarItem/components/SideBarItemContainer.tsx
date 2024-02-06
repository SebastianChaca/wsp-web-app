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
        bg: selected ? 'sideBar.selected' : 'sideBar.hover',
      }}
      bg={selected ? 'sideBar.selected' : 'transparent'}
      onClick={handleClick}
      cursor="pointer"
      minH="79px"
    >
      {children}
    </Flex>
  );
};

export default SideBarItemContainer;
