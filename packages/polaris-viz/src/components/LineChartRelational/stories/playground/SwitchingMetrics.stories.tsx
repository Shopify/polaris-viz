import {META} from '../meta';

export default {
  ...META,
  title: 'polaris-viz/Charts/LineChartRelational/Playground',
};

import {useState} from 'react';
import {LineChartRelational} from '../../LineChartRelational';
import type {DataSeries} from '@shopify/polaris-viz-core';

const DATA_ONE: DataSeries[] = [
  {
    name: 'Average',
    data: [
      {
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 3,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 0,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 5,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 14,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 17,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 9,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 2,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: null,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: null,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 3,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 3,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 4,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 3,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 4,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: null,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: null,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 3,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 5,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 6,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 4,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 4,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: null,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: null,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 3,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 7,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 12,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 5,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
];

const DATA_TWO: DataSeries[] = [
  {
    name: 'Average',
    data: [
      {
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 195.62,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 673.49,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 586.65,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 532.92,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 905.4,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1154.44,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1350.7,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1237.86,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 0,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 266.118,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 615.543,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 473.42,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 655.362,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 874.13,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 623.729,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1320.908,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1427.659,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 386.188,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 634.18,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 568.701,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 707.626,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 919.875,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 732.313,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1336.339,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1731.017,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
        key: 'Sun Feb 18 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 432.233,
      },
      {
        key: 'Sun Feb 25 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 683.677,
      },
      {
        key: 'Sun Mar 03 2024 23:00:00 GMT-0600 (Central Standard Time)',
        value: 617.035,
      },
      {
        key: 'Sun Mar 10 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 778.883,
      },
      {
        key: 'Sun Mar 17 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1151.421,
      },
      {
        key: 'Sun Mar 24 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 803.217,
      },
      {
        key: 'Sun Mar 31 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 1336.53,
      },
      {
        key: 'Sun Apr 07 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: 2073.605,
      },
      {
        key: 'Sun Apr 14 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 21 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun Apr 28 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 05 2024 23:00:00 GMT-0500 (Central Daylight Time)',
        value: null,
      },
      {
        key: 'Sun May 12 2024 23:00:00 GMT-0500 (Central Daylight Time)',
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
];

export const SwitchingMetrics = () => {
  const [num, setNum] = useState(0);

  function onClick() {
    setNum((prev) => (prev === 0 ? 1 : 0));
  }

  return (
    <>
      <div style={{height: '500px', width: 800}}>
        <LineChartRelational data={num == 0 ? DATA_ONE : DATA_TWO} />
      </div>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
        onClick={onClick}
      >
        Change Data
      </button>
    </>
  );
};
