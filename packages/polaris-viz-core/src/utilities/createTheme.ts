import type {Theme, PartialTheme} from '../types';
import {DEFAULT_THEME} from '../constants';

export const createTheme = (
  theme: PartialTheme,
  baseTheme = DEFAULT_THEME,
): Theme => {
  const themeKeys = Object.keys(baseTheme);

  return themeKeys.reduce((accumulator: any, key: keyof Theme) => {
    const defaultValue = baseTheme[key];
    const value = theme[key];

    if (
      typeof defaultValue === 'string' ||
      typeof value === 'string' ||
      Array.isArray(defaultValue)
    ) {
      accumulator[key] = value == null ? defaultValue : value;
    } else {
      accumulator[key] = {
        ...baseTheme[key],
        ...theme[key],
      };
    }
    return accumulator;
  }, {});
};
