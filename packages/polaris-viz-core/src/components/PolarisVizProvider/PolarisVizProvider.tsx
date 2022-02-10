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
}: PolarisVizProviderProps) {
  const value = useMemo(() => {
    return {
      components: {
        svg: 'svg',
        circle: 'circle',
        ellipse: 'ellipse',
        // eslint-disable-next-line id-length
        g: 'g',
        text: 'text',
        tspan: 'tSpan',
        textPath: 'textPath',
        path: 'path',
        polygon: 'polygon',
        polyline: 'polyline',
        line: 'line',
        rect: 'rect',
        use: 'use',
        image: 'image',
        symbol: 'symbol',
        defs: 'defs',
        linearGradient: 'linearGradient',
        radialGradient: 'radialGradient',
        stop: 'stop',
        clippath: 'clipPath',
        pattern: 'pattern',
        mask: 'mask',
      },
      themes: createThemes({
        Default,
        Light,
        Print,
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
