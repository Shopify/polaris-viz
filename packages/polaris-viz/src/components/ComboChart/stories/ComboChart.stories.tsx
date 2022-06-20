import React from 'react';
import type {Story, Meta} from '@storybook/react';
import type {DataGroup} from '@shopify/polaris-viz-core';

import {ComboChart, ComboChartProps} from '../ComboChart';

import {THEME_CONTROL_ARGS, TYPE_CONTROL_ARGS} from '../../../storybook';

export default {
  title: 'polaris-viz/Charts/ComboChart',
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

const DATA: DataGroup[] = [
  {
    shape: 'Bar',
    series: [
      {
        name: 'POS',
        data: [
          {value: 100, key: '2020-07-07T12:00:00'},
          {value: 100, key: '2020-07-08T12:00:00'},
          {value: 100, key: '2020-07-09T12:00:00'},
          {value: 100, key: '2020-07-10T12:00:00'},
          {value: 100, key: '2020-07-11T12:00:00'},
        ],
      },
      {
        name: 'Online',
        data: [
          {value: 100, key: '2020-07-07T12:00:00'},
          {value: 100, key: '2020-07-08T12:00:00'},
          {value: 100, key: '2020-07-09T12:00:00'},
          {value: 100, key: '2020-07-10T12:00:00'},
          {value: 100, key: '2020-07-11T12:00:00'},
        ],
        color: 'lime',
      },
      {
        name: 'Mobile',
        data: [
          {value: 100, key: '2020-07-07T12:00:00'},
          {value: 100, key: '2020-07-08T12:00:00'},
          {value: 100, key: '2020-07-09T12:00:00'},
          {value: 100, key: '2020-07-10T12:00:00'},
          {value: 100, key: '2020-07-11T12:00:00'},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    series: [
      {
        name: 'Sessions from Google ads',
        data: [
          {value: 100, key: '2020-07-07T12:00:00'},
          {value: 100, key: '2020-07-08T12:00:00'},
          {value: 100, key: '2020-07-09T12:00:00'},
          {value: 100, key: '2020-07-10T12:00:00'},
          {value: 100, key: '2020-07-11T12:00:00'},
        ],
      },
      {
        name: 'Sessions from Facebooks ads',
        data: [
          {value: 100, key: '2020-07-07T12:00:00'},
          {value: 100, key: '2020-07-08T12:00:00'},
          {value: 100, key: '2020-07-09T12:00:00'},
          {value: 100, key: '2020-07-10T12:00:00'},
          {value: 100, key: '2020-07-11T12:00:00'},
        ],
      },
    ],
  },
];

const Template: Story<ComboChartProps> = ({...args}: ComboChartProps) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <ComboChart {...args} />
    </div>
  );
};

export const Default: Story<ComboChartProps> = Template.bind({});

Default.args = {
  data: DATA,
  xAxisOptions: {
    labelFormatter: (value: string) => {
      return new Date(value).toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
      });
    },
  },
};
