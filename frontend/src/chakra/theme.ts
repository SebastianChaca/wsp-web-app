import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttons/buttonTheme';

export const theme = extendTheme({
  components: { Button: buttonTheme },
  colors: {
    brand: {
      backgroundWhite: '#E2E8F0',
      white: '#EDF2F7',
      gray: '#c4c4c4',
      gray2: '#CBD5E0',
      online: '#38A169',
      offline: '#E53E3E',
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: 'brand.backgroundWhite',
      },
    }),
  },
});
