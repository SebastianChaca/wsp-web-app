import { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface SideBarUserInfoContainerProps {
  children: ReactNode;
}

const SideBarUserInfoContainer: FC<SideBarUserInfoContainerProps> = ({
  children,
}) => {
  return (
    <Flex
      margin="0px"
      padding="18px 16px 10px"
      overflow="hidden"
      alignItems="start"
      justifyContent="space-between"
      w="100%"
      minHeight="79px"
      borderBottom="1px solid #c4c4c4"
    >
      {children}
    </Flex>
  );
};

export default SideBarUserInfoContainer;
