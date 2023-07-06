import {createContext} from 'react';
import {createHost} from '@react-spring/animated';

import type {SvgComponents, Theme} from '../types';
import {
  DEFAULT_THEME as Default,
  LIGHT_THEME as Light,
  UPLIFT_THEME as Uplift,
  DEFAULT_COMPONENTS as DefaultComponents,
  DEFAULT_THEME_NAME,
} from '../constants';

const host = createHost({
  // eslint-disable-next-line id-length
  g: 'G',
});

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
  components: SvgComponents;
  animated: typeof host.animated;
  defaultTheme: string;
}>({
  themes: {
    Default,
    Light,
    Uplift,
  },
  components: {
    ...DefaultComponents,
  },
  animated: host.animated,
  defaultTheme: DEFAULT_THEME_NAME,
});
