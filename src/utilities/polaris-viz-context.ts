import {createContext} from 'react';

import type {Theme} from '../types';
import {DEFAULT_THEME as Default, LIGHT_THEME as Light} from '../constants';

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
  isPrinting: boolean;
  setPrinting: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isPrinting: false,
  setPrinting: () => false,
  themes: {
    Default,
    Light,
  },
});
