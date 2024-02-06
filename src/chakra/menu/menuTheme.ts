import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  _hover: {
    bg: 'none',
  },
});

export const menuTheme = defineStyleConfig({
  baseStyle: { baseStyle },
});
