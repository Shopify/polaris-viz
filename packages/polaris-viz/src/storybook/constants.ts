import {ChartState} from '@shopify/polaris-viz-core';
import type {ArgType} from '@storybook/components';

export const THEME_CONTROL_ARGS = {
  description: 'The theme that the chart will inherit its styles from',
  options: ['Default', 'Light'],
  control: {
    type: 'select',
  },
};
export const CHART_STATE_CONTROL_ARGS = {
  description:
    'Controls if the chart should display Loading, Error or Success state',
  options: [ChartState.Error, ChartState.Loading, ChartState.Success],
};

export const TYPE_CONTROL_ARGS = {
  description:
    'Changes the grouping of the bars. If `stacked` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group.',
  options: ['default', 'stacked'],
};

export const DIRECTION_CONTROL_ARGS = {
  description: 'Changes the direction of the chart.',
  options: ['vertical', 'horizontal'],
};

export const LEGEND_CONTROL_ARGS: ArgType = {
  description: 'Renders a `<Legend />` component underneath the chart.',
};

export const RENDER_TOOLTIP_DESCRIPTION =
  'This accepts a function that is called to render the tooltip content. When necessary it calls `formatXAxisLabel` and/or `formatYAxisLabel` to format the `DataSeries[]` values and passes them to `<TooltipContent />`. [RenderTooltipContentData type definition.](https://polaris-viz.shopify.com/?path=/docs/polaris-viz-subcomponents-tooltipcontent-rendertooltipcontent--page)';

export const DATA_ARGS = {
  description:
    'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
};

export const ANNOTATIONS_ARGS = {
  description: 'An array of annotations to show on the chart.',
};

export const LEGEND_POSITION_ARGS = {
  description: 'Determines the position of the legend.',
  options: [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'top',
    'right',
    'bottom',
    'left',
  ],
};

export const X_AXIS_OPTIONS_ARGS = {
  description: 'An object that defines the xAxis and its options.',
};

export const Y_AXIS_OPTIONS_ARGS = {
  description: 'An object that defines the yAxis and its options.',
};
