import tokens from '@shopify/polaris-tokens';
import {Color, TokensColor, VizPaletteColor} from 'types';

const vizColors = {
  primary: '#00A19F',
  secondary: '#292370',
  tertiary: '#0D8CED',
  quaternary: '#9D35C1',
  pastComparison: '#919EAB',
  positive: '#008060',
  negative: '#D72C0D',
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
