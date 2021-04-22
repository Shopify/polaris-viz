import tokens from '@shopify/polaris-tokens';
import {Color, TokensColor, VizPaletteColor} from 'types';

import {vizColors} from './viz-colors';

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
