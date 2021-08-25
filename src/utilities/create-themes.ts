import type {Theme, PartialTheme} from '../types';
import {DEFAULT_THEME} from '../constants';

export const createTheme = (
  theme: PartialTheme,
  baseTheme = DEFAULT_THEME,
): Theme => {
  const themeKeys = Object.keys(baseTheme);

  return themeKeys.reduce((accumulator: any, key: keyof Theme) => {
    const defaultValue = DEFAULT_THEME[key];
    const value = theme[key];

    if (
      typeof defaultValue === 'string' ||
      typeof value === 'string' ||
      Array.isArray(defaultValue)
    ) {
      accumulator[key] = value == null ? defaultValue : value;
    } else {
      accumulator[key] = {
        ...DEFAULT_THEME[key],
        ...theme[key],
      };
    }
    return accumulator;
  }, {});
};

export const createThemes = (themeRecord: {[key: string]: PartialTheme}) => {
  return Object.keys(themeRecord).reduce((accumulator, themeName) => {
    accumulator[themeName] = createTheme(themeRecord[themeName]);
    return accumulator;
  }, {} as {[key: string]: Theme});
};
