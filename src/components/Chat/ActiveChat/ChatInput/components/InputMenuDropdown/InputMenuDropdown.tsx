import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { TbLibraryPhoto } from 'react-icons/tb';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { useDropImageContext } from '../../../Messages/components/DropImage/context/DropImageContext';

const InputMenuDropdown = () => {
  const { open } = useDropImageContext();
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiPlus size="30px" />}
          bg="trasnparent"
          _hover={{
            bg: 'brand.fadedBack',
            padding: '0px',
          }}
          isRound
        />

        <MenuList>
          <MenuItem onClick={open} icon={<TbLibraryPhoto size="20px" />}>
            Photos
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default InputMenuDropdown;
