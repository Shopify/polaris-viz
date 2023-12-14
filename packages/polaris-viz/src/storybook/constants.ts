import {ChartState} from '@shopify/polaris-viz-core';
import type {ArgType} from '@storybook/components';

export const CONTROLS_ARGS = {
  sort: 'requiredFirst',
  expanded: true,
};

export const THEME_CONTROL_ARGS = {
  description: 'The theme that the chart will inherit its styles from',
  options: ['Default', 'Light', 'Uplift'],
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

export const LEGEND_FULL_WIDTH_ARGS = {
  description:
    'Allows the legend to take up the remaining width of the chart container.',
  control: {
    type: 'boolean',
  },
};

export const SHOW_LEGEND_ARGS = {
  description: 'Whether to show the legend or not.',
  control: {
    type: 'boolean',
  },
};

export const SHOW_LEGEND_VALUES_ARGS = {
  description:
    'Whether to show the values in the legend or not. If `showLegend` is false, or `legendPosition` is not `left`/`right`, this prop will have no effect.',
  control: {
    type: 'boolean',
  },
};

export const RENDER_LEGEND_CONTENT_ARGS = {
  description:
    'This accepts a function that is called to render the legend content instead of the given legend. If `showLegend` is false, this prop will have no effect.',
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
  control: {
    type: 'select',
  },
};

export const X_AXIS_OPTIONS_ARGS = {
  description: 'An object that defines the xAxis and its options.',
};

export const Y_AXIS_OPTIONS_ARGS = {
  description: 'An object that defines the yAxis and its options.',
};

export const SKIP_LINK_ARGS = {
  description:
    'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
};

export const IS_ANIMATED_ARGS = {
  description:
    'Whether to animate when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
};

export const DATA_SERIES_ARGS = {
  description:
    'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
};

export const EMPTY_STATE_TEXT_ARGS = {
  description:
    'Used to indicate to screen readers that a chart with no series data has been rendered, in the case that an empty array is passed as the data. If the series prop could be an empty array, it is strongly recommended to include this prop.',
};
