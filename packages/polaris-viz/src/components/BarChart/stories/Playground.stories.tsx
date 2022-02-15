import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';

export default {
  title: 'polaris-viz/Default Charts/BarChart/Playground',
  component: BarChart,
  parameters: {
    horizontalMargin: 0,
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
} as Meta;

const DATA = [
  {
    data: [
      {
        value: 4,
        key: '0',
      },
      {
        value: 3,
        key: '1',
      },
      {
        value: 0,
        key: '2',
      },
      {
        value: 0,
        key: '3',
      },
      {
        value: 0,
        key: '4',
      },
      {
        value: 1,
        key: '5',
      },
      {
        value: 0,
        key: '6',
      },
      {
        value: 4,
        key: '7',
      },
      {
        value: 3,
        key: '8',
      },
      {
        value: 4,
        key: '9',
      },
      {
        value: 8,
        key: '10',
      },
      {
        value: 8,
        key: '11',
      },
      {
        value: 5,
        key: '12',
      },
      {
        value: 7,
        key: '13',
      },
      {
        value: 5,
        key: '14',
      },
      {
        value: 3,
        key: '15',
      },
      {
        value: 4,
        key: '16',
      },
      {
        value: 2,
        key: '17',
      },
      {
        value: 6,
        key: '18',
      },
      {
        value: 8,
        key: '19',
      },
      {
        value: 8,
        key: '20',
      },
      {
        value: 3,
        key: '21',
      },
      {
        value: 8,
        key: '22',
      },
      {
        value: 4,
        key: '23',
      },
    ],
    name: 'First-time',
  },
  {
    data: [
      {
        value: 4,
        key: '0',
      },
      {
        value: 0,
        key: '1',
      },
      {
        value: 1,
        key: '2',
      },
      {
        value: 2,
        key: '3',
      },
      {
        value: 0,
        key: '4',
      },
      {
        value: 0,
        key: '5',
      },
      {
        value: 1,
        key: '6',
      },
      {
        value: 1,
        key: '7',
      },
      {
        value: 2,
        key: '8',
      },
      {
        value: 0,
        key: '9',
      },
      {
        value: 2,
        key: '10',
      },
      {
        value: 12,
        key: '11',
      },
      {
        value: 5,
        key: '12',
      },
      {
        value: 4,
        key: '13',
      },
      {
        value: 4,
        key: '14',
      },
      {
        value: 7,
        key: '15',
      },
      {
        value: 5,
        key: '16',
      },
      {
        value: 6,
        key: '17',
      },
      {
        value: 5,
        key: '18',
      },
      {
        value: 6,
        key: '19',
      },
      {
        value: 6,
        key: '20',
      },
      {
        value: 3,
        key: '21',
      },
      {
        value: 2,
        key: '22',
      },
      {
        value: 2,
        key: '23',
      },
    ],
    name: 'Returning',
  },
];

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const WebData = Template.bind({});

WebData.args = {
  type: 'stacked',
  xAxisOptions: {
    labelFormatter: (value) => {
      const formatter = new Intl.DateTimeFormat('en', {
        timeStyle: 'short',
      });

      return formatter
        .format(new Date(2021, 1, 1, +value!))
        .toLocaleLowerCase()
        .replace('am', 'a.m.')
        .replace('pm', 'p.m.');
    },
  },
  data: DATA,
};

const SingleValuesTemplate: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <BarChart {...args} />
    </div>
  );
};

export const SingleValues = SingleValuesTemplate.bind({});

SingleValues.args = {
  type: 'stacked',
  data: DATA,
};
