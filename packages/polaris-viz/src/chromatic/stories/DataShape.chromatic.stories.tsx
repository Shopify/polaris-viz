import React from 'react';
import {storiesOf} from '@storybook/react';
import {
  BarChart,
  LineChart,
  PolarisVizProvider,
  StackedAreaChart,
} from '../../components';
import type {DataSeries} from '@shopify/polaris-viz-core';

const DATA = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: 4},
      {key: 'Thursday', value: null},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 5},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 6},
      {key: 'Thursday', value: 12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

const DATA_MISSING_POINTS = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: 4},
      {key: 'Thursday', value: null},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 5},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 6},
      {key: 'Thursday', value: 12},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

type DataShape =
  | 'mixed'
  | 'positive'
  | 'negative'
  | 'zero'
  | 'null'
  | 'low-mixed'
  | 'high-mixed'
  | 'low-positive'
  | 'high-positive'
  | 'low-negative'
  | 'high-negative'
  | 'missing'
  | 'empty';

const DATA_SHAPES: Record<DataShape, DataSeries[]> = {
  mixed: getData('mixed'),
  positive: getData('positive'),
  negative: getData('negative'),
  zero: getData('zero'),
  null: getData('null'),
  'low-mixed': getData('low-mixed'),
  'high-mixed': getData('high-mixed'),
  'low-positive': getData('low-positive'),
  'high-positive': getData('high-positive'),
  'low-negative': getData('low-negative'),
  'high-negative': getData('high-negative'),
  missing: DATA_MISSING_POINTS,
  empty: [],
};

function formatValue(shape: DataShape, value: any) {
  switch (shape) {
    case 'positive':
      return Math.abs(value ?? 1);
    case 'negative':
      return -Math.abs(value ?? 1);
    case 'zero':
      return 0;
    case 'null':
      return null;
    case 'low-mixed':
      return value / 100;
    case 'low-positive':
      return Math.abs(value ?? 1 / 100);
    case 'low-negative':
      return -Math.abs(value ?? 1 / 100);
    case 'high-mixed':
      return value * 10000;
    case 'high-positive':
      return Math.abs(value * 10000);
    case 'high-negative':
      return -Math.abs(value * 10000);
    default:
      return value;
  }
}

function getData(shape: DataShape) {
  return DATA.map((series) => {
    return {
      ...series,
      data: series.data.map(({key, value}) => {
        return {key, value: formatValue(shape, value)};
      }),
    };
  });
}

const CHARTS = {
  BarChart: BarChart,
  LineChart: LineChart,
  StackedAreaChart: StackedAreaChart,
};

Object.keys(DATA_SHAPES).forEach((shape) => {
  const stories = storiesOf(
    `Chromatic/Data Shapes/${shape}`,
    module,
  ).addParameters({chromatic: {disableSnapshot: false}});

  stories.add(shape, () => {
    return (
      <div style={{display: 'grid', gap: '20px'}}>
        <PolarisVizProvider>
          {Object.keys(CHARTS).map((key) => {
            const Chart = CHARTS[key];

            return (
              <>
                <p>
                  <strong>{key}</strong>
                </p>
                <div style={{height: 300, width: 700, display: 'block'}}>
                  <Chart data={DATA_SHAPES[shape] ?? []} isAnimated={false} />
                </div>
              </>
            );
          })}
        </PolarisVizProvider>
      </div>
    );
  });
});
