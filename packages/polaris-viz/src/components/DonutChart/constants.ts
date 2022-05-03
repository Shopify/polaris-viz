import type {GradientStop} from '@shopify/polaris-viz';

import type {DonutChartColors} from './types';

export const ARC_CORNER_RADIUS = 2;
export const ARC_PAD_ANGLE = 0.02;
export const EVENT_DEBOUNCE_TIME = 10;
export const DONUT_CHART_THICKNESS = 18;

const defaultGradientOffset = {
  from: 75,
  to: 100,
};

// The orders of the entries determine the priority that the color has over the others
export const GRADIENT_COLORS: {
  [key in DonutChartColors]: GradientStop[];
} = {
  teal: [
    {color: '#4C9AAF', offset: defaultGradientOffset.from},
    {color: '#33798C', offset: defaultGradientOffset.to},
  ],
  blue: [
    {color: '#4B92E5', offset: defaultGradientOffset.from},
    {color: '#3672BB', offset: defaultGradientOffset.to},
  ],
  indigo: [
    {color: '#997AFC', offset: defaultGradientOffset.from},
    {color: '#7F4AFA', offset: defaultGradientOffset.to},
  ],
  purple: [
    {color: '#B176E2', offset: defaultGradientOffset.from},
    {color: '#9F41DC', offset: defaultGradientOffset.to},
  ],
  magenta: [
    {color: '#DA62C4', offset: defaultGradientOffset.from},
    {color: '#B1489E', offset: defaultGradientOffset.to},
  ],
  orange: [
    {color: '#CA7D4A', offset: defaultGradientOffset.from},
    {color: '#A26134', offset: defaultGradientOffset.to},
  ],
  yellow: [
    {color: '#97933E', offset: defaultGradientOffset.from},
    {color: '#74742C', offset: defaultGradientOffset.to},
  ],
  sky: [{color: '#3672BB', offset: defaultGradientOffset.to}],
};

export const DONUT_COLORS = Object.keys(GRADIENT_COLORS);
