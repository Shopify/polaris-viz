import type {Story} from '@storybook/react';

import {LineChart} from '../../LineChart';
import type {LineChartProps} from '../../LineChart';

import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA = [
  {
    name: 'NULL',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
      {
        key: 'Fri Nov 10 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
    ],
  },
  {
    name: 'Biltong Taster Pack',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 123.99,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 123.99,
      },
    ],
  },
  {
    name: 'Chili Biltong Slab 8oz',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 69.98,
      },
      {
        key: 'Fri Nov 10 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 31.11,
      },
    ],
  },
  {
    name: 'Droëwors',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 167.79,
      },
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 187.97,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 61.08,
      },
    ],
  },
  {
    name: 'Smokehouse Biltong',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 64.99,
      },
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 31.11,
      },
    ],
  },
  {
    name: 'Traditional Biltong Slab 8oz',
    data: [
      {
        key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 69.98,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 55.98,
      },
      {
        key: 'Fri Nov 10 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 31.11,
      },
    ],
  },
  {
    name: 'Chili Biltong',
    data: [
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 31.11,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 9.99,
      },
    ],
  },
  {
    name: 'Chili Lime Biltong',
    data: [
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 31.11,
      },
      {
        key: 'Fri Nov 10 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 72.89,
      },
    ],
  },
  {
    name: 'Grass Fed Biltong',
    data: [
      {
        key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 87.98,
      },
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 19.98,
      },
    ],
  },
  {
    name: 'Grass Fed Biltong Slab 8oz',
    data: [
      {
        key: 'Wed Nov 08 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 34.99,
      },
    ],
  },
  {
    name: 'Garlic & Herb Biltong Slab 8oz',
    data: [
      {
        key: 'Fri Nov 10 2023 23:00:00 GMT-0600 (Central Standard Time)',
        value: 31.11,
      },
    ],
  },
];

const Template: Story<LineChartProps> = () => {
  return <LineChart data={DATA} isAnimated={false} />;
};

export const MisMatchedData = Template.bind({});
