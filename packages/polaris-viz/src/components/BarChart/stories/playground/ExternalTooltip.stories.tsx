import type {Story} from '@storybook/react';

import type {BarChartProps} from '../../BarChart';
import {BarChart} from '../../BarChart';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
  decorators: [],
};

function Card(args: BarChartProps) {
  return (
    <div
      style={{
        height: 400,
        width: 400,
        background: 'white',
        borderRadius: '8px',
        padding: 10,
      }}
    >
      <BarChart {...args} theme="Uplift" />
    </div>
  );
}

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{overflow: 'auto'}}>
      <Card {...args} />
      <div style={{height: 700, width: 10}} />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Card {...args} />
        <Card {...args} />
        <Card {...args} />
      </div>
    </div>
  );
};

export const ExternalTooltip: Story<BarChartProps> = Template.bind({});

ExternalTooltip.args = {
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
        {value: 132, key: '2020-04-05T12:00:00'},
        {value: 159, key: '2020-04-06T12:00:00'},
        {value: 239, key: '2020-04-07T12:00:00'},
      ],
    },
    {
      name: 'Previous month',
      data: [
        {value: 709, key: '2020-03-02T12:00:00'},
        {value: 238, key: '2020-03-01T12:00:00'},
        {value: 190, key: '2020-03-03T12:00:00'},
        {value: 90, key: '2020-03-04T12:00:00'},
        {value: 237, key: '2020-03-05T12:00:00'},
        {value: 580, key: '2020-03-07T12:00:00'},
        {value: 172, key: '2020-03-06T12:00:00'},
      ],
      isComparison: true,
    },
  ],
};

export const ExternalTooltipHorizontal: Story<BarChartProps> = Template.bind(
  {},
);

ExternalTooltipHorizontal.args = {
  direction: 'horizontal',
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
        {value: 132, key: '2020-04-05T12:00:00'},
        {value: 159, key: '2020-04-06T12:00:00'},
        {value: 239, key: '2020-04-07T12:00:00'},
      ],
    },
    {
      name: 'Previous month',
      data: [
        {value: 709, key: '2020-03-02T12:00:00'},
        {value: 238, key: '2020-03-01T12:00:00'},
        {value: 190, key: '2020-03-03T12:00:00'},
        {value: 90, key: '2020-03-04T12:00:00'},
        {value: 237, key: '2020-03-05T12:00:00'},
        {value: 580, key: '2020-03-07T12:00:00'},
        {value: 172, key: '2020-03-06T12:00:00'},
      ],
      isComparison: true,
    },
  ],
};

export const ExternalTooltipHorizontalNegative: Story<BarChartProps> =
  Template.bind({});

ExternalTooltipHorizontalNegative.args = {
  direction: 'horizontal',
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
        {value: -234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
        {value: 132, key: '2020-04-05T12:00:00'},
        {value: -159, key: '2020-04-06T12:00:00'},
        {value: 239, key: '2020-04-07T12:00:00'},
      ],
    },
  ],
};
