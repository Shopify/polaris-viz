import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';
import {THEME_CONTROL_ARGS} from '../../../storybook';
import {FunnelChart, FunnelChartProps} from '../FunnelChart';

export default {
  title: 'polaris-viz/Default Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show conversion data.',
      },
      yScale: {
        controls: null,
      },
      xScale: {
        controls: null,
      },
    },
  },
  argTypes: {
    xAxisOptions: {
      description: `Used to pass a labelFormatter function to format the values displayed on Y axis`,
    },
    yAxisOptions: {
      description:
        'Used to pass a labelFormatter function to format the values displayed on Y axis',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const data = [
  {
    data: [
      {
        value: 126,
        key: 'Opens',
      },
      {
        value: 48,
        key: 'Visitors',
      },
      {
        value: 12,
        key: 'Added to carts',
      },
      {
        value: 0,
        key: 'Orders',
      },
    ],
    name: 'Conversion',
  },
];

const DefaultTemplate: Story<FunnelChartProps> = (args: FunnelChartProps) => {
  return (
    <div style={{height: 400}}>
      <FunnelChart {...args} />
    </div>
  );
};

export const Default = DefaultTemplate.bind({});

Default.args = {
  data,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
};

export const Light = DefaultTemplate.bind({});

Light.args = {
  theme: 'Light',
  data,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
};
