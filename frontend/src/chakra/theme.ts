import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttons/buttonTheme';
import { menuTheme } from './menu/menuTheme';

const gray = '#CBD5E0';
const primary = '#923DA8';
export const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
  colors: {
    brand: {
      backgroundWhite: '#E2E8F0',
      white: '#EDF2F7',
      gray: '#c4c4c4',
      gray2: gray,
      online: '#38A169',
      offline: '#E53E3E',
      primary,
    },
    message: {
      out: {
        bg: '#7674FE',
        color: '#ffff',
      },
      in: {
        bg: gray,
        color: '#646464',
      },
      sideBar: {
        selected: '#A0AEC0',
        hover: gray,
      },
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
