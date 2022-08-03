import React from 'react';
import {storiesOf} from '@storybook/react';
import {
  BarChart,
  LineChart,
  PolarisVizProvider,
  StackedAreaChart,
} from '../../components';
import type {DataSeries} from '@shopify/polaris-viz-core';

const NUMBERS = [
  38, 24, 3, 54, 28, 65, 51, 63, 65, 56, 6, 11, 5, 61, 54, 35, 67, 68, 22, 20,
  41, 25, 47, 61, 3,
];

type DataVolume =
  | 'single'
  | 'few'
  | 'lots'
  | 'too-many'
  | 'single-multi'
  | 'few-multi'
  | 'lots-multi'
  | 'too-many-multi';

const DATA_SHAPES: Record<DataVolume, DataSeries[]> = {
  single: getData(1),
  few: getData(3),
  lots: getData(100),
  'too-many': getData(500),
  'single-multi': getData(1, 3),
  'few-multi': getData(3, 3),
  'lots-multi': getData(100, 3),
  'too-many-multi': getData(500, 3),
};

function getData(dataCount: number, seriesCount = 1) {
  let dataIndex = 0;
  const max = NUMBERS.length;

  return [
    ...Array(seriesCount)
      .fill(null)
      .map((_, index) => {
        return {
          name: `${index}`,
          data: [
            ...Array(dataCount)
              .fill(null)
              .map((_, dIndex) => {
                dataIndex = dataIndex + 1 + index;

                if (dataIndex >= max) {
                  dataIndex = 0;
                }

                return {key: `Day ${dIndex}`, value: NUMBERS[dataIndex]};
              }),
          ],
        };
      }),
  ];
}

const CHARTS = {
  BarChart: BarChart,
  LineChart: LineChart,
  StackedAreaChart: StackedAreaChart,
};

Object.keys(DATA_SHAPES).forEach((shape) => {
  const stories = storiesOf(
    `Chromatic/Data Volume/${shape}`,
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
                <div style={{height: 400, width: 800, display: 'block'}}>
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
