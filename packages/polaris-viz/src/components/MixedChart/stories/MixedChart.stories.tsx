import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';

import {MixedChart, MixedChartProps} from '../MixedChart';

import {THEME_CONTROL_ARGS, TYPE_CONTROL_ARGS} from '../../../storybook';
import type {DataSeries} from '@shopify/polaris-viz-core';

export default {
  title: 'polaris-viz/Default Charts/MixedChart',
  component: MixedChart,
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

const BAR_CHART_DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: -3},
      // {key: 'Tuesday', value: 7},
      // {key: 'Wednesday', value: 7},
      // {key: 'Thursday', value: 8},
      // {key: 'Friday', value: 50},
      // {key: 'Saturday', value: 0},
      // {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      // {key: 'Tuesday', value: 0},
      // {key: 'Wednesday', value: 10},
      // {key: 'Thursday', value: 15},
      // {key: 'Friday', value: 8},
      // {key: 'Saturday', value: 50},
      // {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      // {key: 'Tuesday', value: 0},
      // {key: 'Wednesday', value: 15},
      // {key: 'Thursday', value: 12},
      // {key: 'Friday', value: 50},
      // {key: 'Saturday', value: 5},
      // {key: 'Sunday', value: 0.1},
    ],
  },
];

export const LINE_CHART_DATA = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {value: 333, key: '2020-04-01T12:00:00'},
      // {value: 797, key: '2020-04-02T12:00:00'},
      // {value: 234, key: '2020-04-03T12:00:00'},
      // {value: 534, key: '2020-04-04T12:00:00'},
      // {value: 132, key: '2020-04-05T12:00:00'},
      // {value: 159, key: '2020-04-06T12:00:00'},
      // {value: 239, key: '2020-04-07T12:00:00'},
      // {value: 708, key: '2020-04-08T12:00:00'},
      // {value: 234, key: '2020-04-09T12:00:00'},
      // {value: 645, key: '2020-04-10T12:00:00'},
      // {value: 543, key: '2020-04-11T12:00:00'},
      // {value: 89, key: '2020-04-12T12:00:00'},
      // {value: 849, key: '2020-04-13T12:00:00'},
      // {value: 129, key: '2020-04-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {value: -709, key: '2020-03-02T12:00:00'},
      // {value: 238, key: '2020-03-01T12:00:00'},
      // {value: 190, key: '2020-03-03T12:00:00'},
      // {value: 90, key: '2020-03-04T12:00:00'},
      // {value: 237, key: '2020-03-05T12:00:00'},
      // {value: -580, key: '2020-03-07T12:00:00'},
      // {value: 172, key: '2020-03-06T12:00:00'},
      // {value: 12, key: '2020-03-08T12:00:00'},
      // {value: 390, key: '2020-03-09T12:00:00'},
      // {value: 43, key: '2020-03-10T12:00:00'},
      // {value: 710, key: '2020-03-11T12:00:00'},
      // {value: 791, key: '2020-03-12T12:00:00'},
      // {value: 623, key: '2020-03-13T12:00:00'},
      // {value: 21, key: '2020-03-14T12:00:00'},
    ],
    color: 'red',
    isComparison: true,
  },
];

const DATA_ALL_POSITIVE = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 3}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 4}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 7}],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [{value: 333, key: '2020-04-01T12:00:00'}],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [{value: 709, key: '2020-03-02T12:00:00'}],
      },
    ],
  },
];

const DATA_FIRST_NEGATIVE = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: -3}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 4}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 7}],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [{value: 333, key: '2020-04-01T12:00:00'}],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [{value: 709, key: '2020-03-02T12:00:00'}],
      },
    ],
  },
];

const DATA_SECOND_NEGATIVE = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: 3}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 4}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 7}],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [{value: -333, key: '2020-04-01T12:00:00'}],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [{value: 709, key: '2020-03-02T12:00:00'}],
      },
    ],
  },
];

const DATA_BOTH_NEGATIVE = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: -3}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: 4}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: 7}],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [{value: -333, key: '2020-04-01T12:00:00'}],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [{value: 709, key: '2020-03-02T12:00:00'}],
      },
    ],
  },
];

const DATA_ALL_NEGATIVE = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'Breakfast',
        data: [{key: 'Monday', value: -3}],
      },
      {
        name: 'Lunch',
        data: [{key: 'Monday', value: -4}],
      },
      {
        name: 'Dinner',
        data: [{key: 'Monday', value: -7}],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Apr 01–Apr 14, 2020',
        data: [{value: -333, key: '2020-04-01T12:00:00'}],
      },
      {
        name: 'Mar 01–Mar 14, 2020',
        data: [{value: -709, key: '2020-03-02T12:00:00'}],
      },
    ],
  },
];

const DATAS = {
  DATA_ALL_POSITIVE: DATA_ALL_POSITIVE,
  DATA_FIRST_NEGATIVE: DATA_FIRST_NEGATIVE,
  DATA_SECOND_NEGATIVE: DATA_SECOND_NEGATIVE,
  DATA_BOTH_NEGATIVE: DATA_BOTH_NEGATIVE,
  DATA_ALL_NEGATIVE: DATA_ALL_NEGATIVE,
};

// const Template: Story<MixedChartProps> = (args: MixedChartProps) => {
//   return (
//     <div style={{height: CONTAINER_HEIGHT}}>
//       <MixedChart {...args} />
//     </div>
//   );
// };

// export const Default: Story<MixedChartProps> = Template.bind({});

// Default.args = {
//   data: [
//     {
//       shape: 'Bar',
//       series: BAR_CHART_DATA,
//       yAxisOptions: {
//         labelFormatter: (value: number) => `${value}L`,
//       },
//     },
//     {
//       shape: 'Line',
//       series: LINE_CHART_DATA,
//       yAxisOptions: {
//         labelFormatter: (value: number) => `${value}R`,
//       },
//     },
//   ],
// };

const Template: Story<MixedChartProps> = (args: MixedChartProps) => {
  const [data, setData] = useState(DATA_ALL_POSITIVE);

  return (
    <>
      <div style={{height: CONTAINER_HEIGHT}}>
        <MixedChart data={data} {...args} />
      </div>
      <select
        onChange={(event) => {
          console.log(event.target.value, DATAS[event.target.value]);
          setData(DATAS[event.target.value]);
        }}
      >
        <option value="DATA_ALL_POSITIVE">All positive</option>
        <option value="DATA_FIRST_NEGATIVE">First negative</option>
        <option value="DATA_SECOND_NEGATIVE">Second negative</option>
        <option value="DATA_BOTH_NEGATIVE">Both negative</option>
        <option value="DATA_ALL_NEGATIVE">All negative</option>
      </select>
    </>
  );
};

export const Default: Story<MixedChartProps> = Template.bind({});

Default.args = {
  // data: [
  //   {
  //     shape: 'Bar',
  //     series: BAR_CHART_DATA,
  //   },
  //   {
  //     shape: 'Line',
  //     series: LINE_CHART_DATA,
  //   },
  // ],
};
