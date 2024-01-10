import type {Story} from '@storybook/react';

export {META as default} from '../meta';

import {DEFAULT_PROPS, Template} from '../data';
import type {LineChartProps} from '../../../LineChart/LineChart';
import {generateDayRange, randomNumber} from '../../../Docs/utilities';
import type {DataSeries} from '@shopify/polaris-viz-core';

export const SeriesColors: Story<LineChartProps> = Template.bind({});

const data = generateMultipleSeries(13);

SeriesColors.args = {
  ...DEFAULT_PROPS,
  data,
  isAnimated: false,
  showLegend: true,
};

function generateMultipleSeries(quantity: number, dataSetLength = 10) {
  const dataSeries: DataSeries[] = [];

  for (const [index] of Array(quantity).fill(null).entries()) {
    const data = generateDataSet(dataSetLength);

    dataSeries.push({
      name: `Series ${index + 1}`,
      data: alterData(data, false),
    });

    dataSeries.push({
      name: `Predictive ${index + 1}`,
      data: alterData(data, true),
      metadata: {
        isPredictive: true,
        startKey: data[5].key,
      },
      styleOverride: {
        line: {
          strokeDasharray: '1 10 1',
          hasArea: false,
        },
      },
    });
  }

  for (const [index, series] of dataSeries.entries()) {
    if (series?.metadata == null) {
      continue;
    }

    if (series.metadata.isPredictive) {
      series.metadata.relatedIndex = index - 1;
    }
  }

  return dataSeries;
}

function alterData(data, isPredictive) {
  const half = data.length / 2;

  return [...data].map((series, index) => {
    const isNull =
      ((isPredictive && index < half) || (!isPredictive && index > half)) ??
      false;

    return {
      ...series,
      value: isNull ? null : series.value,
    };
  });
}

function generateDataSet(dataLength: number) {
  const dates = generateDayRange(dataLength);

  return Array(dataLength)
    .fill(null)
    .map((_, index) => {
      return {
        value: randomNumber(20, 50),
        key: dates[index],
      };
    });
}
