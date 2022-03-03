import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {SparkBarChart} from '../SparkBarChart';
import {THEME_CONTROL_ARGS} from '../../../storybook';
import type {SparkBarChartProps} from '@shopify/polaris-viz-core';

export default {
  title: 'polaris-viz/Spark Charts/SparkBarChart',
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used in small sizes to give an overview of how a metric has performed over time. <br /><br /> This component inherits its height and width from its container.',
      },
    },
  },
  component: SparkBarChart,
  decorators: [
    (Story: any) => (
      <div style={{width: '200px', height: '100px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    data: {
      description:
        "The prop to determine the chart's bars. Null bars will not be plotted. Bars with the value of `0` will render a very small bar to indicate the presence of the value.<br /><br /><strong>Note:</strong> We currently only support a single series and a comparison series. Any additional series passed to the data array will be ignored.",
    },
    accessibilityLabel: {
      description: 'Visually hidden text for screen readers.',
    },
    dataOffsetLeft: {
      description:
        'The amount of pixels to add as a left margin to the bar data.',
    },
    dataOffsetRight: {
      description:
        'The amount of pixels to add as a right margin to the bar data.',
    },
    isAnimated: {
      description: 'Determines whether to animate the chart on state changes.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<SparkBarChartProps> = (args: SparkBarChartProps) => {
  return <SparkBarChart {...args} />;
};

const comparisonValue = 2000;
const defaultProps: SparkBarChartProps = {
  isAnimated: true,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: 300},
        {key: 3, value: 400},
        {key: 4, value: 400},
        {key: 5, value: 100},
        {key: 6, value: 2000},
        {key: 7, value: 800},
        {key: 8, value: 900},
        {key: 9, value: 200},
        {key: 10, value: 400},
      ],
    },
    {
      data: [
        {key: 0, value: comparisonValue},
        {key: 1, value: comparisonValue},
        {key: 2, value: comparisonValue},
        {key: 3, value: comparisonValue},
        {key: 4, value: comparisonValue},
        {key: 5, value: comparisonValue},
        {key: 6, value: comparisonValue},
        {key: 7, value: comparisonValue},
        {key: 8, value: comparisonValue},
        {key: 9, value: comparisonValue},
        {key: 10, value: comparisonValue},
      ],
      isComparison: true,
    },
  ],
  accessibilityLabel:
    'A bar chart showing orders over time for the past 11 weeks. The minimum is 100 orders and the maximum is 1,000 orders, compared to an average of 500 orders during previous 11-week period.',
};

export const Default: Story<SparkBarChartProps> = Template.bind({});
Default.args = defaultProps;

export const OffsetAndNulls: Story<SparkBarChartProps> = Template.bind({});
OffsetAndNulls.args = {
  ...defaultProps,
  dataOffsetLeft: 10,
  dataOffsetRight: 20,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: -300},
        {key: 3, value: null},
        {key: 4, value: 400},
        {key: 5, value: 0},
        {key: 6, value: 0},
        {key: 7, value: 400},
        {key: 8, value: 700},
        {key: 9, value: 900},
        {key: 10, value: 500},
      ],
    },
    {
      data: [
        {key: 0, value: comparisonValue},
        {key: 1, value: comparisonValue},
        {key: 2, value: comparisonValue},
        {key: 3, value: comparisonValue},
        {key: 4, value: comparisonValue},
        {key: 5, value: comparisonValue},
        {key: 6, value: comparisonValue},
        {key: 7, value: comparisonValue},
        {key: 8, value: comparisonValue},
        {key: 9, value: comparisonValue},
        {key: 10, value: comparisonValue},
      ],
      isComparison: true,
    },
  ],
};

export const OverwrittenSeriesColors: Story<SparkBarChartProps> = Template.bind(
  {},
);
OverwrittenSeriesColors.args = {
  ...defaultProps,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: -300},
        {key: 3, value: null},
        {key: 4, value: 400},
        {key: 5, value: 0},
        {key: 6, value: 0},
        {key: 7, value: 400},
        {key: 8, value: 700},
        {key: 9, value: 900},
        {key: 10, value: 500},
      ],
      color: 'lime',
    },
    {
      data: [
        {key: 0, value: comparisonValue},
        {key: 1, value: comparisonValue},
        {key: 2, value: comparisonValue},
        {key: 3, value: comparisonValue},
        {key: 4, value: comparisonValue},
        {key: 5, value: comparisonValue},
        {key: 6, value: comparisonValue},
        {key: 7, value: comparisonValue},
        {key: 8, value: comparisonValue},
        {key: 9, value: comparisonValue},
        {key: 10, value: comparisonValue},
      ],
      isComparison: true,
    },
  ],
};
