import React, {useMemo, ForwardRefExoticComponent} from 'react';
import type {useTransition} from '@react-spring/core';

import type {
  ColorVisionEventReturn,
  PartialTheme,
  SvgComponents,
} from '../../types';
import {
  DEFAULT_THEME as Default,
  LIGHT_THEME as Light,
  PRINT_THEME as Print,
  DEFAULT_COMPONENTS as DefaultComponents,
} from '../../constants';
import {createThemes} from '../../utilities';
import {PolarisVizContext} from '../../contexts';

export interface PolarisVizProviderProps {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
  components?: SvgComponents;
  animated: <T>(Component: any) => ForwardRefExoticComponent<T>;
  useTransition: typeof useTransition;
  useWatchColorVisionEvents: (props: {
    type: string;
    onIndexChange: (event: ColorVisionEventReturn) => void;
  }) => void;
}

export function PolarisVizProvider({
  children,
  themes,
  components,
  animated,
  useTransition,
  useWatchColorVisionEvents,
}: PolarisVizProviderProps) {
  const value = useMemo(() => {
    return {
      components: {
        ...DefaultComponents,
        ...components,
      },
      themes: createThemes({
        Default,
        Light,
        Print,
        ...themes,
      }),
      animated,
      useTransition,
      useWatchColorVisionEvents,
    };
  }, [themes, components, animated, useTransition, useWatchColorVisionEvents]);

  return (
    <PolarisVizContext.Provider value={value}>
      {children}
    </PolarisVizContext.Provider>
  );
}
