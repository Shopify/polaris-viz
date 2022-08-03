import React from 'react';
import type {Story, Meta} from '@storybook/react';
import type {DataGroup} from '@shopify/polaris-viz-core';

import {ComboChart, ComboChartProps} from '../ComboChart';

import {THEME_CONTROL_ARGS, TYPE_CONTROL_ARGS} from '../../../storybook';
import type {ComboAnnotation} from 'types';

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
    name: 'Total Sales',
    series: [
      {
        name: 'POS',
        data: [
          {value: 3, key: '2020-07-07T12:00:00'},
          {value: -7, key: '2020-07-08T12:00:00'},
          {value: -7, key: '2020-07-09T12:00:00'},
          {value: -8, key: '2020-07-10T12:00:00'},
          {value: 50, key: '2020-07-11T12:00:00'},
        ],
      },
      {
        name: 'Online',
        data: [
          {value: 4, key: '2020-07-07T12:00:00'},
          {value: 0, key: '2020-07-08T12:00:00'},
          {value: -10, key: '2020-07-09T12:00:00'},
          {value: 15, key: '2020-07-10T12:00:00'},
          {value: 8, key: '2020-07-11T12:00:00'},
        ],
        color: 'lime',
      },
      {
        name: 'Mobile',
        data: [
          {value: 7, key: '2020-07-07T12:00:00'},
          {value: 0, key: '2020-07-08T12:00:00'},
          {value: -15, key: '2020-07-09T12:00:00'},
          {value: 8, key: '2020-07-10T12:00:00'},
          {value: 50, key: '2020-07-11T12:00:00'},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    name: 'Total Sessions',
    series: [
      {
        name: 'Sessions from Google ads',
        data: [
          {value: 333, key: '2020-07-07T12:00:00'},
          {value: 797, key: '2020-07-08T12:00:00'},
          {value: 234, key: '2020-07-09T12:00:00'},
          {value: 534, key: '2020-07-10T12:00:00'},
          {value: 132, key: '2020-07-11T12:00:00'},
        ],
      },
      {
        name: 'Sessions from Facebooks ads',
        data: [
          {value: 709, key: '2020-07-07T12:00:00'},
          {value: 238, key: '2020-07-08T12:00:00'},
          {value: 190, key: '2020-07-09T12:00:00'},
          {value: 90, key: '2020-07-10T12:00:00'},
          {value: 399, key: '2020-07-11T12:00:00'},
        ],
        isComparison: true,
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
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    },
  },
};

const ANNOTATIONS: ComboAnnotation[] = [
  {
    startKey: '2020-07-08T12:00:00',
    label: 'Big Sale',
    axis: 'x',
  },
  {
    startKey: '2020-07-11T12:00:00',
    label: 'GDPR rule change',
    content: {
      title: 'GDPR rule change',
      content:
        'New GDPR rules that prevent the unauthorized tracking of user sessions came into effect on Thursday, June 1.',
      linkUrl: 'https://shopify.com',
    },
    axis: 'x',
  },
  {
    startKey: '15',
    label: 'Sales target',
    axis: 'y1',
  },
  {
    startKey: '399',
    label: 'Break-even',
    axis: 'y2',
    content: {
      content: 'This is our break-even point. We can sell for $10 per unit.',
    },
  },
];

export const Annotations: Story<ComboChartProps> = Template.bind({});

Annotations.args = {
  data: DATA,
  annotations: ANNOTATIONS,
};
