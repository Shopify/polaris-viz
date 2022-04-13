import type {Color} from '@shopify/polaris-viz-core';
import {isGradientType} from '@shopify/polaris-viz-core';

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
  defaultValue: true,
  description: 'Renders a `<Legend />` component underneath the chart.',
};

export const X_AXIS_OPTIONS_ARGS = {
  description:
    'An object of optional properties that define the appearance of the xAxis.',
  defaultValue: {
    hide: false,
    labelFormatter: (value: string) => `${value}`,
  },
};

export const Y_AXIS_OPTIONS_ARGS = {
  description:
    'An object of optional properties that define the appearance of the yAxis.',
  defaultValue: {
    integersOnly: false,
    labelFormatter: (value: number) => `${value}`,
  },
};

export const SKIP_LINK_TEXT_ARGS = {
  description:
    'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
};

export const EMPTY_STATE_TEXT_ARGS = {
  description:
    'Used to indicate to screen readers that a chart with no data has been rendered, in the case that an empty array is passed as the series data. It is strongly recommended that this is included if the series prop could be an empty array.',
};

export const DATA_SERIES_ARGS = {
  description:
    'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
};

export const ACCESSIBILITY_LABEL_ARGS = {
  description:
    'Visually hidden text for screen readers. Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
};
