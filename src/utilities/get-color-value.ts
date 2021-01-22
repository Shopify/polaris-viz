import tokens from '@shopify/polaris-tokens';
import type {Color, TokensColor, VizPaletteColor} from 'types';

const vizColors = {
  primary: 'rgb(0,161,159)',
  secondary: 'rgb(41,35,112)',
  tertiary: 'rgb(13,140,237)',
  quaternary: 'rgb(157,53,193)',
  primaryProminent: 'rgb(0, 106, 104)',
  secondaryProminent: 'rgb(9, 6, 37)',
  tertiaryProminent: 'rgb(6, 96, 166)',
  quaternaryProminent: 'rgb(93, 28, 116)',
  pastComparison: 'rgb(145,158,171)',
  positive: 'rgb(0,128,96)',
  negative: 'rgb(215,44,13)',
};

function isTokenType(color: Color): color is TokensColor {
  return color in tokens;
}

function isVizType(color: Color): color is VizPaletteColor {
  return Object.keys(vizColors).includes(color);
}

export function getColorValue(color: Color) {
  if (isVizType(color)) {
    return vizColors[color];
  } else if (isTokenType(color)) {
    return tokens[color];
  } else {
    throw new Error('Color value is not valid.');
  }
}
