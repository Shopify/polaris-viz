import type {DataSeries} from '@shopify/polaris-viz-core';
import {SimpleBarChart} from '../../SimpleBarChart';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA: DataSeries[] = [
  {
    data: [
      {
        key: 'search · google',
        value: 30309.103,
      },
      {
        key: 'None · bullandcleaver',
        value: 7699.192,
      },
      {
        key: 'search · duckduckgo',
        value: 3485.793,
      },
    ],
    name: 'Sep 26, 2023–Sep 24, 2024',
    metadata: {
      trends: {
        '0': {
          trend: 'negative',
          direction: 'downward',
          accessibilityLabel: 'Decrease of 20%',
          value: '20%',
        },
        '1': {
          trend: 'negative',
          direction: 'downward',
          accessibilityLabel: 'Decrease of 52%',
          value: '52%',
        },
        '2': {
          trend: 'positive',
          direction: 'upward',
          accessibilityLabel: 'Increase of 81%',
          value: '81%',
        },
        '3': {
          trend: 'positive',
          direction: 'upward',
          accessibilityLabel: 'Increase of 16%',
          value: '16%',
        },
        '4': {
          trend: 'negative',
          direction: 'downward',
          accessibilityLabel: 'Decrease of 8%',
          value: '8%',
        },
      },
    },
  },
  {
    isComparison: true,
    data: [
      {
        key: 'search · google',
        value: 37674.902,
      },
      {
        key: 'None · bullandcleaver',
        value: 16129.352,
      },
      {
        key: 'search · duckduckgo',
        value: 1925.345,
      },
    ],
    name: 'Sep 26, 2022–Sep 24, 2023',
  },
];

export const SkinnyTrend = () => {
  return (
    <div
      style={{
        height: 250,
        width: 192,
        background: 'rgba(0,0,0,0.20)',
        padding: 10,
      }}
    >
      <SimpleBarChart showLegend={false} data={DATA} />
    </div>
  );
};

export const PositiveTrendOverflow = () => {
  return (
    <div
      style={{
        height: 250,
        width: 192,
        background: 'rgba(0,0,0,0.20)',
        padding: 10,
      }}
    >
      <SimpleBarChart
        showLegend={false}
        data={[
          {
            data: [
              {
                key: 'Droëwors',
                value: 7,
              },
              {
                key: 'Grass Fed Biltong',
                value: 4,
              },
              {
                key: 'Garlic & Herb Biltong',
                value: 1,
              },
              {
                key: 'Garlic & Herb Biltong Slab 8oz',
                value: 1,
              },
              {
                key: 'Traditional Biltong Slab 8oz',
                value: 1,
              },
            ],
            name: 'Top selling products',
            metadata: {
              trends: {
                '0': {
                  value: '75%',
                  trend: 'positive',
                  direction: 'upward',
                },
                '1': {
                  value: '300%',
                  trend: 'positive',
                  direction: 'upward',
                },
                '2': {
                  value: '75%',
                  trend: 'negative',
                  direction: 'downward',
                },
                '4': {
                  value: '50%',
                  trend: 'negative',
                  direction: 'downward',
                },
              },
            },
          },
        ]}
      />
    </div>
  );
};
