import {META} from './meta';
import type {ReactNode} from 'react';
import type {MetaData} from '../types';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/SimpleBarChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import {SimpleBarChart} from '../SimpleBarChart';
import {SINGLE_SERIES} from './data';

const METADATA: MetaData = {
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
};

function Wrapper({children}: {children: ReactNode}) {
  return (
    <div
      style={{
        height: 250,
        width: 250,
        background: 'rgba(255,255,255,0.5)',
        padding: 10,
      }}
    >
      {children}
    </div>
  );
}

export const Default = () => {
  return (
    <Wrapper>
      <SimpleBarChart showLegend={false} data={SINGLE_SERIES} />
    </Wrapper>
  );
};

export const TrendWithAllPositive = () => {
  return (
    <Wrapper>
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
                value: 256.45,
              },
              {
                key: 'Direct',
                value: 1863.96,
              },
            ],
            name: 'Sales by traffic source',
            metadata: METADATA,
          },
        ]}
      />
    </Wrapper>
  );
};

export const TrendWithAllNegative = () => {
  return (
    <Wrapper>
      <SimpleBarChart
        showLegend={false}
        data={[
          {
            data: [
              {
                key: 'Unknown',
                value: -248.14,
              },
              {
                key: 'Social',
                value: -256.45,
              },
              {
                key: 'Direct',
                value: -1863.96,
              },
            ],
            name: 'Sales by traffic source',
            metadata: METADATA,
          },
        ]}
      />
    </Wrapper>
  );
};

export const TrendWithMixedValues = () => {
  return (
    <Wrapper>
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
            ],
            name: 'Sales by traffic source',
            metadata: METADATA,
          },
        ]}
      />
    </Wrapper>
  );
};

export const TrendWithSimilarValues = () => {
  return (
    <Wrapper>
      <SimpleBarChart
        showLegend={false}
        data={[
          {
            data: [
              {
                key: 'Unknown',
                value: 48.14,
              },
              {
                key: 'Social',
                value: -56.45,
              },
              {
                key: 'Direct',
                value: -63.96,
              },
            ],
            name: 'Sales by traffic source',
            metadata: METADATA,
          },
        ]}
      />
    </Wrapper>
  );
};

export const TrendWithUndefinedValue = () => {
  return (
    <Wrapper>
      <SimpleBarChart
        showLegend={false}
        data={[
          {
            data: [
              {
                key: 'Unknown',
                value: 314.15,
              },
              {
                key: 'Social',
                value: -256.45,
              },
              {
                key: 'Direct',
                value: -400.96,
              },
            ],
            name: 'Sales by traffic source',
            metadata: {
              trends: {
                '0': {
                  trend: 'positive',
                  direction: 'upward',
                },
                '2': {
                  value: '1%',
                  trend: 'negative',
                  direction: 'downward',
                },
              },
            },
          },
        ]}
      />
    </Wrapper>
  );
};
