import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {SparkLineChart, SparkLineChartProps} from '@shopify/polaris-viz';

import {THEME_CONTROL_ARGS, ACCESSIBILITY_LABEL_ARGS} from '../../constants';

import {
  DATA,
  OFFSET_AND_NULLS,
  OVERWRITTEN_SERIES_COLORS,
  ZERO_SERIES,
} from './data';

export default {
  title: 'polaris-viz/Spark Charts/SparkLineChart',
  component: SparkLineChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used in small sizes to give an overview of how a metric has performed over time. <br /><br />  This component inherits its height and width from its container.',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{width: '100px', height: '50px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    data: {
      description:
        'The SparkLineChart can show one data series or a set of comparison data series. Each series is configured by the series item in the array.',
    },
    accessibilityLabel: ACCESSIBILITY_LABEL_ARGS,
    isAnimated: {
      description: 'Determines whether to animate the chart on state changes.',
    },
    offsetLeft: {
      description:
        'The amount of pixels to add as a left margin to the non-comparison line data.',
    },
    offsetRight: {
      description:
        'The amount of pixels to add as a right margin to the non-comparison line data.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<SparkLineChartProps> = (args: SparkLineChartProps) => {
  return (
    <div style={{width: '200px', height: '100px'}}>
      <SparkLineChart {...args} />
    </div>
  );
};

const DEFAULT_PROPS: SparkLineChartProps = {
  data: DATA,
  isAnimated: true,
  accessibilityLabel: 'Customer growth over time',
};

export const Default: Story<SparkLineChartProps> = Template.bind({});
Default.args = {
  ...DEFAULT_PROPS,
};

export const withoutSpline: Story<SparkLineChartProps> = Template.bind({});
withoutSpline.args = {
  ...DEFAULT_PROPS,
  theme: 'NoSpline',
};

export const OffsetAndNulls: Story<SparkLineChartProps> = Template.bind({});
OffsetAndNulls.args = {
  ...DEFAULT_PROPS,
  offsetRight: 12,
  offsetLeft: 50,
  data: OFFSET_AND_NULLS,
};

export const OverwrittenSeriesColors: Story<SparkLineChartProps> =
  Template.bind({});
OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: OVERWRITTEN_SERIES_COLORS,
};

export const ZeroSeries: Story<SparkLineChartProps> = Template.bind({});
ZeroSeries.args = {
  ...DEFAULT_PROPS,
  data: ZERO_SERIES,
};
