import React from 'react';
import type {Story, Meta} from '@storybook/react';
import type {SparkBarChartProps} from '@shopify/polaris-viz-core';
import {SparkBarChart} from '@shopify/polaris-viz';

import {ACCESSIBILITY_LABEL_ARGS, THEME_CONTROL_ARGS} from '../../constants';

import {DATA, OFFSET_AND_NULLS, OVERWRITTEN_SERIES_COLORS} from './data';

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
    accessibilityLabel: ACCESSIBILITY_LABEL_ARGS,
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

const DEFAULT_PROPS: SparkBarChartProps = {
  accessibilityLabel:
    'A bar chart showing orders over time for the past 11 weeks. The minimum is 100 orders and the maximum is 1,000 orders, compared to an average of 500 orders during previous 11-week period.',
  data: [],
  isAnimated: true,
};

export const Default: Story<SparkBarChartProps> = Template.bind({});
Default.args = {
  ...DEFAULT_PROPS,
  data: DATA,
};

export const OffsetAndNulls: Story<SparkBarChartProps> = Template.bind({});
OffsetAndNulls.args = {
  ...DEFAULT_PROPS,
  dataOffsetLeft: 10,
  dataOffsetRight: 20,
  data: OFFSET_AND_NULLS,
};

export const OverwrittenSeriesColors: Story<SparkBarChartProps> = Template.bind(
  {},
);
OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: OVERWRITTEN_SERIES_COLORS,
};
