import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttons/buttonTheme';

const gray = '#CBD5E0';
const primary = '#923DA8';
const secondary = '#CE93D8';
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
      fadedBack: 'rgba(15, 15, 15,0.2)',
      online: '#38A169',
      offline: '#E53E3E',
      primary,
      secondary,
    },
    message: {
      out: {
        //  bg: '#def0d1',
        bg: '#dfcce8',
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
      responseTo: '#4e5a61',
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
