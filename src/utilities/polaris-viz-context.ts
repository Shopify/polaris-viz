import {createContext} from 'react';

import {Theme} from '../types';
import {DefaultTheme as Default} from '../constants';

export const PolarisVizContext = createContext<{
  themes: Record<string, Theme>;
}>({
  themes: {
    Default,
  },
});
