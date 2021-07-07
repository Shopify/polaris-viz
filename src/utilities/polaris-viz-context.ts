import {createContext} from 'react';

import type {Theme} from '../types';
import {DefaultTheme as Default} from '../constants';

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
}>({
  themes: {
    Default,
  },
});
