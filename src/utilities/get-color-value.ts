import tokens from '@shopify/polaris-tokens';
import type {Color, TokensColor, VizPaletteColor} from 'types';

import {vizColors} from './viz-colors';

function isTokenType(color: Color): color is TokensColor {
  if (typeof color !== 'string') return false;

  return color in tokens;
}

function isVizType(color: Color): color is VizPaletteColor {
  if (typeof color !== 'string') return false;

  return Object.keys(vizColors).includes(color);
}

export function isValidColorToken(color: any): color is Color {
  if (isVizType(color) || isTokenType(color)) {
    return true;
  } else {
    return false;
  }
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
