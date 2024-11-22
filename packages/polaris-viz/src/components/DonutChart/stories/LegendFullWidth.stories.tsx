import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import {DonutChart} from '..';
import type {DonutChartProps} from '..';

import {DEFAULT_PROPS} from './data';

const data = [
  {
    name: 'Shopify Pay',
    data: [{key: 'april - march', value: 50000}],
  },
  {
    name: 'Paypal',
    data: [{key: 'april - march', value: 25000}],
  },
  {
    name: 'Other',
    data: [{key: 'april - march', value: 10000}],
  },
  {
    name: 'This is an extremely long label that will span the remaining width of the chart container',
    data: [{key: 'april - march', value: 4000}],
  },
];

const Template: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <div style={{width: 900, height: 400}}>
      <DonutChart {...args} />
    </div>
  );
};

export const LegendFullWidth: StoryFn<DonutChartProps> = Template.bind({});

LegendFullWidth.args = {
  ...DEFAULT_PROPS,
  data,
  legendFullWidth: true,
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/LegendFullWidth'} as any;
