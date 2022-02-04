import {createContext} from 'react';

import type {Theme} from '../types';
import {DEFAULT_THEME as Default, LIGHT_THEME as Light} from '../constants';

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
  native: boolean;
}>({
  themes: {
    Default,
    Light,
  },
  native: false,
});
