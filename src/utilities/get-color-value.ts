import tokens from '@shopify/polaris-tokens';
import {Color, TokensColor, VizPaletteColor, GradientColor} from 'types';

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

export const gradientColors = {
  primaryGradient: {start: '#44C0BE', end: vizColors.primary},
  secondaryGradient: {start: '#4C43BB', end: vizColors.secondary},
  tertiaryGradient: {start: '#5EAFED', end: vizColors.tertiary},
  quaternaryGradient: {start: '#C55CEA', end: vizColors.quaternary},
  primaryProminentGradient: {
    start: vizColors.primary,
    end: vizColors.primaryProminent,
  },
  secondaryProminentGradient: {
    start: vizColors.secondary,
    end: vizColors.secondaryProminent,
  },
  tertiaryProminentGradient: {
    start: vizColors.tertiary,
    end: vizColors.tertiaryProminent,
  },
  quaternaryProminentGradient: {
    start: vizColors.quaternary,
    end: vizColors.quaternaryProminent,
  },
};

function isTokenType(color: any): color is TokensColor {
  return color in tokens;
}

function isVizType(color: any): color is VizPaletteColor {
  return Object.keys(vizColors).includes(color);
}

export function isGradientType(color: any): color is GradientColor {
  return Object.keys(gradientColors).includes(color);
}

export function getColorValue(color: Color | GradientColor) {
  if (isVizType(color)) {
    return vizColors[color];
  } else if (isTokenType(color)) {
    return tokens[color];
  } else if (isGradientType(color)) {
    const gradient = gradientColors[color];
    return `linear-gradient(180deg, ${gradient.end} 0%, ${gradient.end} 100%), ${gradient.end}`;
  } else {
    throw new Error('Color value is not valid.');
  }
}
