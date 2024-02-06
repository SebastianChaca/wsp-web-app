import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const rounded = defineStyle({
  borderRadius: 24,
  background: 'brand.white',
  _hover: {
    bg: 'brand.gray2',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { rounded },
});
