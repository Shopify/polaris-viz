import React, {useMemo, useState} from 'react';

import type {PartialTheme} from '../../types';
import {DEFAULT_THEME as Default, LIGHT_THEME as Light} from '../../constants';
import {PolarisVizContext} from '../../utilities/polaris-viz-context';
import {createThemes} from '../../utilities';

export interface PolarisVizProviderProps {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
}

export function PolarisVizProvider({
  children,
  themes,
}: PolarisVizProviderProps) {
  const [isPrinting, setPrinting] = useState(false);

  const value = useMemo(() => {
    return {
      setPrinting,
      isPrinting,
      themes: createThemes({
        Default,
        Light,
        ...themes,
      }),
    };
  }, [themes, isPrinting]);

  return (
    <PolarisVizContext.Provider value={value}>
      {children}
    </PolarisVizContext.Provider>
  );
}
