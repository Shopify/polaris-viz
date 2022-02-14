import {createContext, ForwardRefExoticComponent} from 'react';
import {withAnimated} from '@react-spring/animated/dist/declarations/src/withAnimated';

import type {SvgComponents, Theme} from '../types';
import {
  DEFAULT_THEME as Default,
  LIGHT_THEME as Light,
  DEFAULT_COMPONENTS as DefaultComponents,
} from '../constants';

export const PolarisVizContext = createContext<{
  themes: {[key: string]: Theme};
  components: SvgComponents;
  animated: <T>(Component: any) => ForwardRefExoticComponent<T>;
}>({
  themes: {
    Default,
    Light,
  },
  components: {
    ...DefaultComponents,
  },
  animated: (Component: any) =>
    withAnimated(Component, {
      applyAnimatedValues: () => false,
      createAnimatedStyle: () => Component,
      getComponentProps: (props) => props,
    }),
});
