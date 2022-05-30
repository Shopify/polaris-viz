import type {Color} from '@shopify/polaris-viz-core';
import {isGradientType, ChartState} from '@shopify/polaris-viz-core';

export const getDataPoint = (limit = 1000) => {
  return Math.random() * limit;
};

export const THEME_CONTROL_ARGS = {
  description: 'The theme that the chart will inherit its styles from',
  control: {type: 'select', options: ['Default', 'Light']},
};
export const CHART_STATE_CONTROL_ARGS = {
  description:
    'Controls if the chart should display Loading, Error or Success state',
  control: {
    type: 'select',
    options: [ChartState.Error, ChartState.Loading, ChartState.Success],
  },
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

export const RENDER_TOOLTIP_DESCRIPTION =
  'This accepts a function that is called to render the tooltip content. When necessary it calls `formatXAxisLabel` and/or `formatYAxisLabel` to format the DataSeries[] values and passes them to `<TooltipContent />`. [RenderTooltipContentData type definition.]()';

export const DATA_ARGS = {
  description:
    'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
};
