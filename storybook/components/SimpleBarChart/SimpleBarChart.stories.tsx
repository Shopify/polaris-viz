import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {SimpleBarChart, SimpleBarChartProps} from '@shopify/polaris-viz';

import {
  DATA_SERIES_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
} from '../../constants';
import {PageWithSizingInfo} from '../Docs/stories/components/PageWithSizingInfo';

import {
  COLOR_OVERRIDE_SERIES,
  COMPARISON_SERIES,
  SERIES,
  SINGLE_SERIES,
} from './data';

export default {
  title: 'polaris-viz/Simple Charts/SimpleBarChart',
  component: SimpleBarChart,
  parameters: {
    previewHeight: 'auto',
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be stacked or side by side.  ',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: DATA_SERIES_ARGS,
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    type: TYPE_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    xAxisOptions: {
      description:
        'An object used to configure the labels displayed beside the bars.',
      defaultValue: {
        labelFormatter: (value: string) => value,
      },
    },
  },
} as Meta;

const CONTAINER_HEIGHT = 500;

const Template: Story<SimpleBarChartProps> = (args: SimpleBarChartProps) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <SimpleBarChart {...args} />
    </div>
  );
};

export const Default: Story<SimpleBarChartProps> = Template.bind({});

Default.args = {
  data: SINGLE_SERIES,
};

export const MultipleSeries: Story<SimpleBarChartProps> = Template.bind({});

MultipleSeries.args = {
  data: SERIES,
};

export const Comparison: Story<SimpleBarChartProps> = Template.bind({});

Comparison.args = {
  data: COMPARISON_SERIES,
};

export const OverwrittenSeriesColors: Story<SimpleBarChartProps> =
  Template.bind({});

OverwrittenSeriesColors.args = {
  data: COLOR_OVERRIDE_SERIES,
};

export const SimpleStacked: Story<SimpleBarChartProps> = Template.bind({});

SimpleStacked.args = {
  data: SERIES,
  type: 'stacked',
};
