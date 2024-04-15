import type {Story} from '@storybook/react';

import {LineChart, LineChartProps} from '../../LineChart';
import {META} from '../meta';
import {randomNumber} from '../../../Docs/utilities';

export default {
  ...META,
  title: `${META.title}/Playground`,
  decorators: [],
};

function Card(args: LineChartProps) {
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
      <LineChart {...args} />
    </div>
  );
}

const HOURLY_DATA = [
  {
    name: 'Hourly Data',
    data: Array(743)
      .fill(null)
      .map((_, index) => {
        return {
          key: new Date(2021, 1, 1, index).toISOString(),
          value: randomNumber(0, 400),
        };
      }),
  },
];

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <div style={{overflow: 'auto'}}>
      <Card {...args} />
      <div style={{height: 700, width: 10}} />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Card {...args} data={HOURLY_DATA} />
        <Card {...args} />
        <Card {...args} />
      </div>
    </div>
  );
};

export const ExternalTooltip: Story<LineChartProps> = Template.bind({});

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
        {value: 12, key: '2020-03-08T12:00:00'},
        {value: 390, key: '2020-03-09T12:00:00'},
        {value: 43, key: '2020-03-10T12:00:00'},
        {value: 710, key: '2020-03-11T12:00:00'},
        {value: 791, key: '2020-03-12T12:00:00'},
        {value: 623, key: '2020-03-13T12:00:00'},
        {value: 21, key: '2020-03-14T12:00:00'},
      ],
      isComparison: true,
    },
  ],
};
