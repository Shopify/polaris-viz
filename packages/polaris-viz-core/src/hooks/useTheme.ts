import {useContext} from 'react';

import type {Theme} from '../types';
import {PolarisVizContext} from '../contexts/PolarisVizContext';

export function useTheme(themeName = 'Default'): Theme {
  const {themes} = useContext(PolarisVizContext);

  if (Object.prototype.hasOwnProperty.call(themes, themeName)) {
    return themes[themeName];
  } else {
    throw new Error(
      `${themeName} theme not found. Did you forget to define it in the PolarisVizProvider?`,
    );
  }
}
