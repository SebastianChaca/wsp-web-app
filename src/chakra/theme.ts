import { createSystem, defaultConfig } from '@chakra-ui/react';
import { buttonTheme } from './buttons/buttonTheme';

const gray = '#CBD5E0';
const primary = '#923DA8';
const secondary = '#CE93D8';
export const system = createSystem(defaultConfig, {
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
      error: '#a33129',
    },
    message: {
      out: {
        bg: '#dfcce8',
        color: '#ffff',
      },
      in: {
        bg: gray,
        color: '#646464',
      },
      responseTo: '#4e5a61',
    },
    sideBar: {
      selected: '#A0AEC0',
      hover: gray,
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
