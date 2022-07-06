import {useContext} from 'react';

import {DEFAULT_THEME_NAME} from '../constants';
import type {Theme} from '../types';
import {PolarisVizContext} from '../contexts/PolarisVizContext';

import {useChartContext} from './useChartContext';

export function useTheme(passedTheme?: string): Theme {
  const {themes} = useContext(PolarisVizContext);
  const {theme} = useChartContext();

  const themeName = passedTheme ?? theme ?? DEFAULT_THEME_NAME;

  if (Object.prototype.hasOwnProperty.call(themes, themeName)) {
    return themes[themeName];
  } else {
    throw new Error(
      `${themeName} theme not found. Did you forget to define it in the PolarisVizProvider?`,
    );
  }
}
