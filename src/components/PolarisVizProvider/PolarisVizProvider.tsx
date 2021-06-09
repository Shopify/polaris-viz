import React, {useMemo} from 'react';

import {Theme} from '../../types';
import {DefaultTheme as Default} from '../../constants';
import {PolarisVizContext} from '../../utilities/polaris-viz-context';
import {createThemes} from '../../utilities';

export interface PolarisVizContextProps {
  children: React.ReactNode;
  themes?: Record<string, Theme>;
}

export function PolarisVizProvider({children, themes}: PolarisVizContextProps) {
  const customThemes = useMemo(
    () =>
      createThemes({
        Default,
        ...themes,
      }),
    [themes],
  );

  return (
    <PolarisVizContext.Provider
      value={{
        themes: customThemes,
      }}
    >
      {children}
    </PolarisVizContext.Provider>
  );
}
