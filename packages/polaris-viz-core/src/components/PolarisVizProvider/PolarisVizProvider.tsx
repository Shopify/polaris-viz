import React, {useMemo} from 'react';

import type {PartialTheme, SvgComponents} from '../../types';
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
  animated: (...args: any[]) => React.ReactNode;
}

export function PolarisVizProvider({
  children,
  themes,
  components,
  animated,
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
    };
  }, [themes, components, animated]);

  return (
    <PolarisVizContext.Provider value={value}>
      {children}
    </PolarisVizContext.Provider>
  );
}
