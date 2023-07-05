import type {ForwardRefExoticComponent, ReactNode} from 'react';
import {useMemo} from 'react';

import type {PartialTheme, SvgComponents} from '../../types';
import {
  DEFAULT_THEME as Default,
  LIGHT_THEME as Light,
  PRINT_THEME as Print,
  UPLIFT_THEME as Uplift,
  DEFAULT_COMPONENTS as DefaultComponents,
  DEFAULT_THEME_NAME,
} from '../../constants';
import {createThemes} from '../../utilities';
import {PolarisVizContext} from '../../contexts';

export interface PolarisVizProviderProps {
  children: ReactNode;
  themes?: {[key: string]: PartialTheme};
  components?: SvgComponents;
  defaultTheme?: string;
  animated: <T>(Component: any) => ForwardRefExoticComponent<T>;
}

export function PolarisVizProvider({
  children,
  defaultTheme = DEFAULT_THEME_NAME,
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
        Uplift,
        ...themes,
      }),
      animated,
      defaultTheme,
    };
  }, [themes, components, animated, defaultTheme]);

  return (
    <PolarisVizContext.Provider value={value}>
      {children}
    </PolarisVizContext.Provider>
  );
}
