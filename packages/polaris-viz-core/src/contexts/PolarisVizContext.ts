import {createContext} from 'react';
import {createHost} from '@react-spring/animated';

import type {ErrorBoundaryResponse, SvgComponents, Theme} from '../types';
import {
  DARK_THEME as Dark,
  LIGHT_THEME as Light,
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
  onError?: ErrorBoundaryResponse;
}>({
  themes: {
    Dark,
    Light,
  },
  components: {
    ...DefaultComponents,
  },
  animated: host.animated,
  defaultTheme: DEFAULT_THEME_NAME,
});
