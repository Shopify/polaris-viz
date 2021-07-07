import React, {useMemo} from 'react';

import type {Theme} from '../../types';
import {DefaultTheme as Default} from '../../constants';
import {PolarisVizContext} from '../../utilities/polaris-viz-context';
import {createThemes} from '../../utilities';

export interface PolarisVizContextProps {
  children: React.ReactNode;
  themes?: {[key: string]: Theme};
}

export function PolarisVizProvider({children, themes}: PolarisVizContextProps) {
  const customThemes = useMemo(
    () => ({
      themes: createThemes({
        Default,
        ...themes,
      }),
    }),
    [themes],
  );

  return (
    <PolarisVizContext.Provider value={customThemes}>
      {children}
    </PolarisVizContext.Provider>
  );
}
