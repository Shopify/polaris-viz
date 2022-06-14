import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';

import {ComboChart, ComboChartProps} from '../ComboChart';

import {THEME_CONTROL_ARGS, TYPE_CONTROL_ARGS} from '../../../storybook';
import type {ComboChartDataSeries} from '../types';

export default {
  title: 'polaris-viz/Default Charts/ComboChart',
  component: ComboChart,
  parameters: {
    previewHeight: 'auto',
    docs: {
      description: {
        component: '',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
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

const DATA_ALL_POSITIVE: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 10}],
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
          {value: 100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_FIRST_SOME_NEGATIVE: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 10}],
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
          {value: 100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_SECOND_SOME_NEGATIVE: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 10}],
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
          {value: -100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_BOTH_SOME_NEGATIVE: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 10}],
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
          {value: -100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_ALL_NEGATIVE: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: -1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: -10}],
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
          {value: -100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: -500, key: '2020-03-02T12:00:00'},
          {value: -500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_FAN_SAP: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: -1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: -10}],
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
          {value: 100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_FAP_NAP: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 10}],
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
          {value: -100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: -500, key: '2020-03-02T12:00:00'},
          {value: -500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_FAN_SSN: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: -1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: -10}],
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
          {value: -100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: 500, key: '2020-03-02T12:00:00'},
          {value: 500, key: '2020-03-02T12:00:00'},
        ],
      },
    ],
  },
];

const DATA_FSN_NAP: ComboChartDataSeries[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 1}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -5}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 10}],
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
          {value: -100, key: '2020-04-01T12:00:00'},
        ],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [
          {value: -500, key: '2020-03-02T12:00:00'},
          {value: -500, key: '2020-03-02T12:00:00'},
        ],
      },
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
  const [data, setData] = useState<ComboChartDataSeries[]>(DATA_ALL_POSITIVE);

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
