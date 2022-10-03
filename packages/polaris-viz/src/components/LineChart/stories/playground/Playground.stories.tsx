import React from 'react';
import type {Story} from '@storybook/react';

import {LineChart, LineChartProps} from '../../LineChart';
import {randomNumber} from '../../../Docs/utilities';
import {formatLinearXAxisLabel} from '../../../../storybook/utilities';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

const COHORT_DATA = [
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1089,
      },
      {
        key: 2,
        value: 0.0749,
      },
      {
        key: 3,
        value: 0.0594,
      },
      {
        key: 4,
        value: 0.0541,
      },
      {
        key: 5,
        value: 0.0506,
      },
      {
        key: 6,
        value: 0.0491,
      },
      {
        key: 7,
        value: 0.0438,
      },
      {
        key: 8,
        value: 0.0413,
      },
      {
        key: 9,
        value: 0.0376,
      },
      {
        key: 10,
        value: 0.0376,
      },
      {
        key: 11,
        value: 0.0413,
      },
    ],
    color: '#33798c',
    name: 'Average',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1178,
      },
      {
        key: 2,
        value: 0.1272,
      },
      {
        key: 3,
        value: 0.0696,
      },
      {
        key: 4,
        value: 0.0587,
      },
      {
        key: 5,
        value: 0.0603,
      },
      {
        key: 6,
        value: 0.0644,
      },
      {
        key: 7,
        value: 0.055,
      },
      {
        key: 8,
        value: 0.058,
      },
      {
        key: 9,
        value: 0.0416,
      },
      {
        key: 10,
        value: 0.04,
      },
      {
        key: 11,
        value: 0.0413,
      },
    ],
    color: '#4b92e5',
    name: '2021-09-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1458,
      },
      {
        key: 2,
        value: 0.0747,
      },
      {
        key: 3,
        value: 0.0599,
      },
      {
        key: 4,
        value: 0.0589,
      },
      {
        key: 5,
        value: 0.0609,
      },
      {
        key: 6,
        value: 0.0524,
      },
      {
        key: 7,
        value: 0.054,
      },
      {
        key: 8,
        value: 0.0392,
      },
      {
        key: 9,
        value: 0.0369,
      },
      {
        key: 10,
        value: 0.0356,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#7f4afa',
    name: '2021-10-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1087,
      },
      {
        key: 2,
        value: 0.0677,
      },
      {
        key: 3,
        value: 0.0604,
      },
      {
        key: 4,
        value: 0.0622,
      },
      {
        key: 5,
        value: 0.052,
      },
      {
        key: 6,
        value: 0.0556,
      },
      {
        key: 7,
        value: 0.0388,
      },
      {
        key: 8,
        value: 0.0371,
      },
      {
        key: 9,
        value: 0.036,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#b176e2',
    name: '2021-11-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.09,
      },
      {
        key: 2,
        value: 0.0669,
      },
      {
        key: 3,
        value: 0.0643,
      },
      {
        key: 4,
        value: 0.0518,
      },
      {
        key: 5,
        value: 0.0527,
      },
      {
        key: 6,
        value: 0.0383,
      },
      {
        key: 7,
        value: 0.0371,
      },
      {
        key: 8,
        value: 0.0355,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#b1489e',
    name: '2021-12-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1063,
      },
      {
        key: 2,
        value: 0.0784,
      },
      {
        key: 3,
        value: 0.0596,
      },
      {
        key: 4,
        value: 0.0587,
      },
      {
        key: 5,
        value: 0.0421,
      },
      {
        key: 6,
        value: 0.0392,
      },
      {
        key: 7,
        value: 0.0377,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#b66e3f',
    name: '2022-01-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1199,
      },
      {
        key: 2,
        value: 0.0737,
      },
      {
        key: 3,
        value: 0.0687,
      },
      {
        key: 4,
        value: 0.0467,
      },
      {
        key: 5,
        value: 0.0436,
      },
      {
        key: 6,
        value: 0.0414,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#bdb24e',
    name: '2022-02-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1032,
      },
      {
        key: 2,
        value: 0.0796,
      },
      {
        key: 3,
        value: 0.0507,
      },
      {
        key: 4,
        value: 0.0454,
      },
      {
        key: 5,
        value: 0.0423,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#4c9aaf',
    name: '2022-03-01T00:00:00-08:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.113,
      },
      {
        key: 2,
        value: 0.06,
      },
      {
        key: 3,
        value: 0.0511,
      },
      {
        key: 4,
        value: 0.0459,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#4282cd',
    name: '2022-04-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.0884,
      },
      {
        key: 2,
        value: 0.0605,
      },
      {
        key: 3,
        value: 0.051,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#997afc',
    name: '2022-05-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.1001,
      },
      {
        key: 2,
        value: 0.0659,
      },
      {
        key: 3,
        value: null,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#9f41dc',
    name: '2022-06-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: 0.0966,
      },
      {
        key: 2,
        value: null,
      },
      {
        key: 3,
        value: null,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#da62c4',
    name: '2022-07-01T00:00:00-07:00',
  },
  {
    data: [
      {
        key: 0,
        value: 1,
      },
      {
        key: 1,
        value: null,
      },
      {
        key: 2,
        value: null,
      },
      {
        key: 3,
        value: null,
      },
      {
        key: 4,
        value: null,
      },
      {
        key: 5,
        value: null,
      },
      {
        key: 6,
        value: null,
      },
      {
        key: 7,
        value: null,
      },
      {
        key: 8,
        value: null,
      },
      {
        key: 9,
        value: null,
      },
      {
        key: 10,
        value: null,
      },
      {
        key: 11,
        value: null,
      },
    ],
    color: '#7a4621',
    name: '2022-08-01T00:00:00-07:00',
  },
];

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

export const LargeDataSet: Story<LineChartProps> = Template.bind({});

LargeDataSet.args = {
  data: HOURLY_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
};

export const BadData: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <LineChart {...args} />
    </div>
  );
};

BadData.args = {
  data: [{name: 'Empty', data: []}],
};

export const CohortDataSet: Story<LineChartProps> = Template.bind({});

CohortDataSet.args = {
  data: COHORT_DATA,
};
