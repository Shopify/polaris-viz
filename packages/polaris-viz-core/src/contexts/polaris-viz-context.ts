import {createContext} from 'react';

import type {SvgComponents, Theme} from '../types';
import {
  DEFAULT_THEME as Default,
  LIGHT_THEME as Light,
  DEFAULT_COMPONENTS as DefaultComponents,
} from '../constants';

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
  native: boolean;
  components: SvgComponents;
}>({
  themes: {
    Default,
    Light,
  },
  native: false,
  components: {
    ...DefaultComponents,
  },
});
