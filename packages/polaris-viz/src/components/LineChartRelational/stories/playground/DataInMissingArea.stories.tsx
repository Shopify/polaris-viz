import {META} from '../meta';
import {Template} from '../data';
import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Charts/LineChartRelational/Playground',
};

import type {LineChartProps} from 'components/LineChart/LineChart';

export const DataInMissingArea: Story<LineChartProps> = Template.bind({});

DataInMissingArea.args = {
  data: [
    {
      name: 'Average',
      data: [
        {
          key: 'Wed Jan 31 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 43.99,
        },
        {
          key: 'Thu Feb 01 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 67.74,
        },
        {
          key: 'Fri Feb 02 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Sat Feb 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 87.98,
        },
        {
          key: 'Sun Feb 04 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Mon Feb 05 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Tue Feb 06 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Wed Feb 07 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 62.22,
        },
        {
          key: 'Thu Feb 08 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 31.11,
        },
        {
          key: 'Fri Feb 09 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Sat Feb 10 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Sun Feb 11 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Mon Feb 12 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Tue Feb 13 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 87.98,
        },
        {
          key: 'Wed Feb 14 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
      ],
      color: [
        {
          offset: 0,
          color: '#079EE1',
        },
        {
          offset: 100,
          color: '#2EB9F5',
        },
      ],
      styleOverride: {
        line: {
          hasArea: false,
        },
      },
    },
    {
      name: '25th percentile',
      data: [
        {
          key: 'Wed Jan 31 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 16.392,
        },
        {
          key: 'Thu Feb 01 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 10.505,
        },
        {
          key: 'Fri Feb 02 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sat Feb 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 46.444,
        },
        {
          key: 'Sun Feb 04 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Mon Feb 05 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Tue Feb 06 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Wed Feb 07 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 8.785,
        },
        {
          key: 'Thu Feb 08 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 49.772,
        },
        {
          key: 'Fri Feb 09 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sat Feb 10 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sun Feb 11 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Mon Feb 12 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Tue Feb 13 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 54.662,
        },
        {
          key: 'Wed Feb 14 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
      ],
      color: 'rgba(218, 182, 242, 1)',
      metadata: {
        relatedIndex: 2,
        areaColor: 'rgba(218, 182, 242, 0.2)',
        legendLabel: '25th - 75th percentile',
      },
      styleOverride: {
        tooltip: {
          shape: 'Bar',
        },
      },
    },
    {
      name: 'Median',
      data: [
        {
          key: 'Wed Jan 31 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 25.819,
        },
        {
          key: 'Thu Feb 01 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 25.163,
        },
        {
          key: 'Fri Feb 02 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sat Feb 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 50.101,
        },
        {
          key: 'Sun Feb 04 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Mon Feb 05 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Tue Feb 06 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Wed Feb 07 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 14.449,
        },
        {
          key: 'Thu Feb 08 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 72.148,
        },
        {
          key: 'Fri Feb 09 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sat Feb 10 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sun Feb 11 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Mon Feb 12 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Tue Feb 13 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 74.067,
        },
        {
          key: 'Wed Feb 14 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
      ],
      color: [
        {
          offset: 0,
          color: '#A249DF',
        },
        {
          offset: 100,
          color: '#BD7DE8',
        },
      ],
      styleOverride: {
        line: {
          hasArea: false,
          strokeDasharray: '3 6',
        },
      },
    },
    {
      name: '75th Percentile',
      data: [
        {
          key: 'Wed Jan 31 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 45.722,
        },
        {
          key: 'Thu Feb 01 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 83.528,
        },
        {
          key: 'Fri Feb 02 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sat Feb 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 54.227,
        },
        {
          key: 'Sun Feb 04 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Mon Feb 05 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Tue Feb 06 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Wed Feb 07 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 15.75,
        },
        {
          key: 'Thu Feb 08 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 94.757,
        },
        {
          key: 'Fri Feb 09 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sat Feb 10 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Sun Feb 11 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Mon Feb 12 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
        {
          key: 'Tue Feb 13 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: 121.513,
        },
        {
          key: 'Wed Feb 14 2024 23:00:00 GMT-0600 (Central Standard Time)',
          value: null,
        },
      ],
      color: 'rgba(218, 182, 242, 1)',
      metadata: {
        relatedIndex: 2,
        areaColor: 'rgba(218, 182, 242, 0.2)',
        legendLabel: '25th - 75th percentile',
      },
      styleOverride: {
        tooltip: {
          shape: 'Bar',
        },
      },
    },
  ],
  annotations: [
    {
      startKey: 'Thu Feb 01 2024 23:00:00 GMT-0600 (Central Standard Time)',
      label: 'No benchmark',
      content: {
        content: 'Not enough data from similar stores',
      },
      axis: 'x',
    },
    {
      startKey: 'Sat Feb 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
      label: 'No benchmark',
      content: {
        content: 'Not enough data from similar stores',
      },
      axis: 'x',
    },
    {
      startKey: 'Thu Feb 08 2024 23:00:00 GMT-0600 (Central Standard Time)',
      label: 'No benchmark',
      content: {
        content: 'Not enough data from similar stores',
      },
      axis: 'x',
    },
    {
      startKey: 'Tue Feb 13 2024 23:00:00 GMT-0600 (Central Standard Time)',
      label: 'No benchmark',
      content: {
        content: 'Not enough data from similar stores',
      },
      axis: 'x',
    },
  ],
  showLegend: true,
  tooltipOptions: {},
  xAxisOptions: {},
  yAxisOptions: {},
  id: 'PRIMARY_VISUALIZATION',
};
