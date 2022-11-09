import React, {useState} from 'react';
import type {Story} from '@storybook/react';

import {ComboChart, ComboChartProps} from '../../ComboChart';

import type {DataGroup} from '@shopify/polaris-viz-core';
import {META} from '../meta';
import {Template as BasicTemplate} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const CONTAINER_HEIGHT = 500;

const DATA_ALL_POSITIVE: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: 1},
          {key: '2020-04-02T12:00:00', value: 1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: 5},
          {key: '2020-04-02T12:00:00', value: 5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: 10},
          {key: '2020-04-02T12:00:00', value: 10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: 100, key: '2020-04-01T12:00:00'},
          {value: 50, key: '2020-04-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_FIRST_SOME_NEGATIVE: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: 1},
          {key: '2020-04-02T12:00:00', value: 1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: -5},
          {key: '2020-04-02T12:00:00', value: -5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: 10},
          {key: '2020-04-02T12:00:00', value: 10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: 100, key: '2020-04-01T12:00:00'},
          {value: 50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_SECOND_SOME_NEGATIVE: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: 1},
          {key: '2020-04-02T12:00:00', value: 1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: 'Mon2020-04-01T12:00:00day', value: 5},
          {key: '2020-04-02T12:00:00', value: 5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: 10},
          {key: '2020-04-02T12:00:00', value: 10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: -100, key: '2020-04-01T12:00:00'},
          {value: -50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_BOTH_SOME_NEGATIVE: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: 1},
          {key: '2020-04-02T12:00:00', value: 1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: -5},
          {key: '2020-04-02T12:00:00', value: -5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: 10},
          {key: '2020-04-02T12:00:00', value: 10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: -100, key: '2020-04-01T12:00:00'},
          {value: -50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_ALL_NEGATIVE: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: -1},
          {key: '2020-04-02T12:00:00', value: -1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: -5},
          {key: '2020-04-02T12:00:00', value: -5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: -10},
          {key: '2020-04-02T12:00:00', value: -10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: -100, key: '2020-04-01T12:00:00'},
          {value: -50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: -500, key: '2020-03-02T12:00:00'},
      //     {value: -500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_FAN_SAP: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: -1},
          {key: '2020-04-02T12:00:00', value: -1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: -5},
          {key: '2020-04-02T12:00:00', value: -5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: -10},
          {key: '2020-04-02T12:00:00', value: -10},
        ],
      },
    ],
    yAxisOptions: {
      labelFormatter: (value) => {
        return `${parseFloat((+(value ?? 0)).toFixed(2))}`;
      },
    },
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: 100, key: '2020-04-01T12:00:00'},
          {value: 50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_FAP_NAP: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: 1},
          {key: '2020-04-02T12:00:00', value: 1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: 5},
          {key: '2020-04-02T12:00:00', value: 5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: 10},
          {key: '2020-04-02T12:00:00', value: 10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: -100, key: '2020-04-01T12:00:00'},
          {value: -50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: -500, key: '2020-03-02T12:00:00'},
      //     {value: -500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_FAN_SSN: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: -1},
          {key: '2020-04-02T12:00:00', value: -1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: -5},
          {key: '2020-04-02T12:00:00', value: -5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: -10},
          {key: '2020-04-02T12:00:00', value: -10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: -100, key: '2020-04-01T12:00:00'},
          {value: 50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //     {value: 500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const DATA_FSN_NAP: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [
          {key: '2020-04-01T12:00:00', value: 1},
          {key: '2020-04-02T12:00:00', value: 1},
        ],
      },
      {
        name: 'Lunch',
        data: [
          {key: '2020-04-01T12:00:00', value: -5},
          {key: '2020-04-02T12:00:00', value: -5},
        ],
      },
      {
        name: 'Dinner',
        data: [
          {key: '2020-04-01T12:00:00', value: 10},
          {key: '2020-04-02T12:00:00', value: 10},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [
          {value: -100, key: '2020-04-01T12:00:00'},
          {value: -50, key: '2020-04-01T12:00:00'},
        ],
      },
      // {
      //   name: 'Mar 01–Mar 14, 2020',
      //   data: [
      //     {value: -500, key: '2020-03-02T12:00:00'},
      //     {value: -500, key: '2020-03-02T12:00:00'},
      //   ],
      // },
    ],
  },
];

const CASES = {
  DATA_ALL_POSITIVE: DATA_ALL_POSITIVE,
  DATA_FIRST_SOME_NEGATIVE: DATA_FIRST_SOME_NEGATIVE,
  DATA_SECOND_SOME_NEGATIVE: DATA_SECOND_SOME_NEGATIVE,
  DATA_BOTH_SOME_NEGATIVE: DATA_BOTH_SOME_NEGATIVE,
  DATA_ALL_NEGATIVE: DATA_ALL_NEGATIVE,
  DATA_FAN_SAP: DATA_FAN_SAP,
  DATA_FAP_NAP: DATA_FAP_NAP,
  DATA_FAN_SSN: DATA_FAN_SSN,
  DATA_FSN_NAP: DATA_FSN_NAP,
};

const Template: Story<ComboChartProps> = ({
  data: argData,
  ...args
}: ComboChartProps) => {
  const [data, setData] = useState<DataGroup[]>(DATA_ALL_POSITIVE);

  return (
    <>
      <div style={{height: CONTAINER_HEIGHT}}>
        <ComboChart data={data} {...args} />
      </div>
      <select
        onChange={(event) => {
          setData(CASES[event.target.value]);
        }}
      >
        <optgroup label="Easy">
          <option value="DATA_ALL_POSITIVE">All positive</option>
          <option value="DATA_FIRST_SOME_NEGATIVE">Bar some negative</option>
          <option value="DATA_SECOND_SOME_NEGATIVE">Line some negative</option>
          <option value="DATA_BOTH_SOME_NEGATIVE">Both some negative</option>
          <option value="DATA_ALL_NEGATIVE">All negative</option>
        </optgroup>
        <optgroup label="Tough">
          <option value="DATA_FAN_SAP">
            Bar all negative, Line all positive
          </option>
          <option value="DATA_FAP_NAP">
            Bar all positive, Line all negative
          </option>
          <option value="DATA_FAN_SSN">
            Bar all negative, Line some negative
          </option>
          <option value="DATA_FSN_NAP">
            Bar some negative, Line all negative
          </option>
        </optgroup>
      </select>
    </>
  );
};

export const Default: Story<ComboChartProps> = Template.bind({});

Default.args = {};

export const WebVitals: Story<ComboChartProps> = BasicTemplate.bind({});

WebVitals.args = {
  data: [
    {
      name: 'Web vitals',
      series: [
        {
          data: [
            {
              key: 'June 25',
              value: 4.1,
            },
            {
              key: 'June 26',
              value: 6.7,
            },
            {
              key: 'June 27',
              value: 7.4,
            },
            {
              key: 'June 28',
              value: 7.6,
            },
            {
              key: 'June 29',
              value: 6.7,
            },
            {
              key: 'June 30',
              value: 8.6,
            },
          ],
          name: 'LCP',
          color: '#5C6AC4',
        },
      ],
      shape: 'Line',
    },
    {
      name: 'Sessions measured',
      series: [
        {
          isComparison: true,
          data: [
            {
              key: 'June 25',
              value: 4057,
            },
            {
              key: 'June 26',
              value: 21583,
            },
            {
              key: 'June 27',
              value: 18069,
            },
            {
              key: 'June 28',
              value: 19332,
            },
            {
              key: 'June 29',
              value: 20282,
            },
            {
              key: 'June 30',
              value: 23515,
            },
          ],
          name: 'Sessions measured',
          color: '#79CCE5',
        },
      ],
      shape: 'Bar',
    },
  ],
};
