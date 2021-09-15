import {createContext} from 'react';

import type {Theme} from 'types';
import {DEFAULT_THEME as Default, LIGHT_THEME as Light} from 'consts';

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
}>({
  themes: {
    Default,
    Light,
  },
});
