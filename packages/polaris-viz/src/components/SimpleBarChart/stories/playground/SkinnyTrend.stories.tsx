import {SimpleBarChart} from '../../SimpleBarChart';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const SkinnyTrend = () => {
  return (
    <div
      style={{
        height: 250,
        width: 250,
        background: 'rgba(255,255,255,0.5)',
        padding: 10,
      }}
    >
      <SimpleBarChart
        showLegend={false}
        data={[
          {
            data: [
              {
                key: 'Unknown',
                value: 248.14,
              },
              {
                key: 'Social',
                value: -256.45,
              },
              {
                key: 'Direct',
                value: -1863.96,
              },
              {
                key: '',
                value: null,
              },
              {
                key: '',
                value: null,
              },
            ],
            name: 'Sales by traffic source',
            metadata: {
              trends: {
                '0': {
                  value: '77%',
                  trend: 'positive',
                  direction: 'upward',
                },
                '2': {
                  value: '907%',
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

export const PositiveTrendOverflow = () => {
  return (
    <div
      style={{
        height: 250,
        width: 250,
        background: 'rgba(255,255,255,0.5)',
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
