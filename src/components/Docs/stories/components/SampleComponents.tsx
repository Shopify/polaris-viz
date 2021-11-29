import React from 'react';

import {
  SparkBarChart,
  SparkLineChart,
  BarChart,
  LineChart,
  MultiSeriesBarChart,
  StackedAreaChart,
  NormalizedStackedBarChart,
} from '../../../../components';
import {
  generateMultipleSeries,
  generateLabels,
  generateMultipleSeriesNewData,
} from '../../../../../documentation/utilities';

export const SampleSparkBarChart = ({theme} = {theme: 'Default'}) => {
  return (
    <SparkBarChart
      theme={theme}
      data={[
        {
          data: [
            {key: 0, value: 100},
            {key: 1, value: 200},
            {key: 2, value: 300},
            {key: 4, value: 400},
            {key: 5, value: 400},
            {key: 6, value: 100},
            {key: 7, value: 2000},
            {key: 8, value: 800},
            {key: 9, value: 900},
            {key: 10, value: 200},
            {key: 11, value: 400},
          ],
        },
      ]}
    />
  );
};

export const SampleSparkLineChart = ({theme} = {theme: 'Default'}) => {
  return (
    <SparkLineChart
      theme={theme}
      data={[
        {
          data: [
            {key: 0, value: 100},
            {key: 1, value: 200},
            {key: 2, value: 300},
            {key: 3, value: 400},
            {key: 4, value: 400},
            {key: 5, value: 1000},
            {key: 6, value: 200},
            {key: 7, value: 800},
            {key: 8, value: 900},
            {key: 9, value: 200},
            {key: 10, value: 400},
          ],
        },
        {
          isComparison: true,
          data: [
            {key: 0, value: 200},
            {key: 1, value: 200},
            {key: 2, value: 200},
            {key: 3, value: 200},
            {key: 4, value: 200},
            {key: 5, value: 200},
            {key: 6, value: 200},
            {key: 7, value: 200},
            {key: 8, value: 200},
            {key: 9, value: 200},
            {key: 10, value: 200},
          ],
        },
      ]}
    />
  );
};

export const SampleLineChart = ({theme} = {theme: 'Default'}) => {
  return (
    <LineChart
      theme={theme}
      isAnimated
      series={[
        {
          name: 'Sales',
          data: [
            {rawValue: 324.19, label: '2020-01-01'},
            {rawValue: 613.29, label: '2020-01-02'},
            {rawValue: -422.79, label: '2020-01-03'},
            {rawValue: 0, label: '2020-01-04'},
            {rawValue: 1, label: '2020-01-05'},
          ],
        },
      ]}
      xAxisOptions={{
        xAxisLabels: ['Jan. 1', 'Jan. 2', 'Jan. 3', 'Jan. 4', 'Jan. 5'],
      }}
    />
  );
};

export const SampleBarchart = ({theme} = {theme: 'Default'}) => {
  return (
    <BarChart
      theme={theme}
      data={[
        {rawValue: 324.19, label: 'Jan. 1'},
        {rawValue: 613.29, label: 'Jan. 2'},
        {rawValue: 1000, label: 'Jan. 3'},
        {rawValue: 432, label: 'Jan. 4'},
        {rawValue: 1, label: 'Jan. 5'},
      ]}
    />
  );
};

export const SampleMultiseriesBarChart = (
  {theme, seriesLength = 3} = {theme: 'Default'},
) => {
  return (
    <MultiSeriesBarChart
      series={generateMultipleSeries(seriesLength)}
      xAxisOptions={{
        labels: generateLabels(1),
      }}
      theme={theme}
    />
  );
};

export const SampleStackedAreaChart = (
  {theme, seriesLength = 3} = {theme: 'Default'},
) => {
  return (
    <StackedAreaChart
      data={generateMultipleSeriesNewData(seriesLength, 3)}
      xAxisOptions={{
        labels: generateLabels(3),
      }}
      theme={theme}
    />
  );
};

export const SampleNormalizedStackedBarChart = (
  {theme} = {theme: 'Default'},
) => {
  return (
    <NormalizedStackedBarChart
      orientation="vertical"
      theme={theme}
      data={[
        {
          label: 'Direct',
          value: 200,
          formattedValue: '$200',
        },
        {
          label: 'Facebook',
          value: 100,
          formattedValue: '$100',
        },
        {
          label: 'Twitter',
          value: 100,
          formattedValue: '$100',
        },
        {
          label: 'Google',
          value: 20,
          formattedValue: '$20',
        },
      ]}
    />
  );
};
