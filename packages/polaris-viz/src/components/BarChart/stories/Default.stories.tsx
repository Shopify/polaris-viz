import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<BarChartProps> = Template.bind({});

Default.args = {
  data: [
    {
      name: 'US-CA',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: 40,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'US-TX',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: 28,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'US-FL',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: 22,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'US-NY',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: 21,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'US-CO',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: 12,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'CA-ON',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: 6,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'CA-AB',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: 1,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'CA-BC',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: 1,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'CA-QC',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: 1,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'GB-ENG',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: 2,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'ZA-WC',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: 2,
        },
        {
          key: 'Ireland',
          value: null,
        },
      ],
    },
    {
      name: 'IE-CO',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: 1,
        },
      ],
    },
    {
      name: 'IE-TA',
      fillValue: null,
      data: [
        {
          key: 'United States',
          value: null,
        },
        {
          key: 'Canada',
          value: null,
        },
        {
          key: 'United Kingdom',
          value: null,
        },
        {
          key: 'South Africa',
          value: null,
        },
        {
          key: 'Ireland',
          value: 1,
        },
      ],
    },
  ],
  tooltipOptions: {},
  xAxisOptions: {},
  yAxisOptions: {
    maxYOverride: null,
  },
  showLegend: true,
};

// Default.args = {
//   data: DEFAULT_DATA,
//   onError: (a, b) => {
//     console.log({a, b});
//   },
// };
