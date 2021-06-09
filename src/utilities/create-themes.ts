import {Theme} from '../types';
import {DefaultTheme} from '../constants';

export const createTheme = (theme: Partial<Theme>): Theme => {
  const themeKeys = Object.keys(DefaultTheme) as [keyof Theme];

  return themeKeys.reduce((accumulator, key: keyof Theme) => {
    accumulator[key] = {
      ...DefaultTheme[key],
      ...theme[key],
    };
    return accumulator;
  }, {} as Theme);
};

export const createThemes = (themeRecord: Record<string, Theme>) => {
  return Object.keys(themeRecord).reduce((accumulator, themeName) => {
    accumulator[themeName] = createTheme(themeRecord[themeName]);
    return accumulator;
  }, {} as Record<string, Theme>);
};
