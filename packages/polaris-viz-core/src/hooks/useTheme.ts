import {useContext, useEffect} from 'react';

import {DEFAULT_THEME_NAME} from '../constants';
import type {Theme} from '../types';
import {PolarisVizContext} from '../contexts/PolarisVizContext';

import {useChartContext} from './useChartContext';

export function useTheme(passedTheme?: string): Theme {
  const {themes, defaultTheme} = useContext(PolarisVizContext);
  const {theme} = useChartContext();

  const themeName = passedTheme ?? theme ?? defaultTheme ?? DEFAULT_THEME_NAME;

  const hasValidTheme = Object.prototype.hasOwnProperty.call(themes, themeName);

  useEffect(() => {
    if (!hasValidTheme) {
      // eslint-disable-next-line no-console
      console.warn(
        `${themeName} theme not found, falling back to ${DEFAULT_THEME_NAME}. Did you forget to define it in the PolarisVizProvider?`,
      );
    }
  }, [hasValidTheme, themeName]);

  if (hasValidTheme) {
    return themes[themeName];
  } else {
    return themes[DEFAULT_THEME_NAME];
  }
}
