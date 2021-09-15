import React, {useMemo} from 'react';

import type {PartialTheme} from 'types';
import {DEFAULT_THEME as Default, LIGHT_THEME as Light} from 'consts';
import {PolarisVizContext} from 'utilities/polaris-viz-context';
import {createThemes} from 'utilities';

export interface PolarisVizProviderProps {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
}

export function PolarisVizProvider({
  children,
  themes,
}: PolarisVizProviderProps) {
  const value = useMemo(() => {
    return {
      themes: createThemes({
        Default,
        Light,
        ...themes,
      }),
    };
  }, [themes]);

  return (
    <PolarisVizContext.Provider value={value}>
      {children}
    </PolarisVizContext.Provider>
  );
}
