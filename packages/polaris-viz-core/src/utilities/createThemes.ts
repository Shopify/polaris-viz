import type {Theme, PartialTheme} from '../types';
import {DEFAULT_THEME, LIGHT_THEME, PRINT_THEME} from '../constants';

const BASE_THEMES: {[key: string]: Theme} = {
  Default: DEFAULT_THEME,
  Light: LIGHT_THEME,
  Print: PRINT_THEME,
};

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

export const createThemes = (themeRecord: {[key: string]: PartialTheme}) => {
  return Object.keys(themeRecord).reduce((accumulator, themeName) => {
    accumulator[themeName] = createTheme(
      themeRecord[themeName],
      BASE_THEMES[themeName],
    );
    return accumulator;
  }, {} as {[key: string]: Theme});
};
