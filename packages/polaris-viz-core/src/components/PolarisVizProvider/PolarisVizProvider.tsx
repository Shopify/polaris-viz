import React, {useMemo} from 'react';

import type {PartialTheme} from '../../types';
import {
  DEFAULT_THEME as Default,
  LIGHT_THEME as Light,
  PRINT_THEME as Print,
} from '../../constants';
import {createThemes} from '../../utilities';
import {PolarisVizContext} from '../../contexts';

export interface PolarisVizProviderProps {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
  native?: boolean;
}

export function PolarisVizProvider({
  children,
  themes,
  native = false,
}: PolarisVizProviderProps) {
  const value = useMemo(() => {
    return {
      themes: createThemes({
        Default,
        Light,
        Print,
        ...themes,
      }),
      native,
    };
  }, [themes, native]);

  return (
    <PolarisVizContext.Provider value={value}>
      {children}
    </PolarisVizContext.Provider>
  );
}
