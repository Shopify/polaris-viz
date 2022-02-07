import type {Color} from '../types';
import {isGradientType} from '../utilities';

export const getDataPoint = (limit = 1000) => {
  return Math.random() * limit;
};

export const THEME_CONTROL_ARGS = {
  description: 'The theme that the chart will inherit its styles from',
  control: {type: 'select', options: ['Default', 'Light']},
};

export const getSingleColor = (color: Color): string => {
  if (isGradientType(color)) {
    return color[0].color;
  }

  return color;
};

export const TYPE_CONTROL_ARGS = {
  description:
    'Changes the grouping of the bars. If `stacked` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group.',
  control: {type: 'select', options: ['default', 'stacked']},
};

export const DIRECTION_CONTROL_ARGS = {
  description: 'Changes the direction of the chart.',
  control: {type: 'select', options: ['vertical', 'horizontal']},
};

export const LEGEND_CONTROL_ARGS = {
  defaultValue: false,
  description: 'Renders a `<Legend />` component underneath the chart.',
};
