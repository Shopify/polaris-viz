import React from 'react';

import {
  Sparkbar,
  Sparkline,
  BarChart,
  LineChart,
  MultiSeriesBarChart,
  StackedAreaChart,
  NormalizedStackedBarChart,
} from '../../../../components';
import {
  generateMultipleSeries,
  generateLabels,
} from '../../../../../documentation/utilities';

export const SampleSparkbar = ({theme} = {theme: 'Default'}) => {
  return (
    <Sparkbar
      theme={theme}
      data={[
        {value: 100},
        {value: 200},
        {value: 300},
        {value: 400},
        {value: 400},
        {value: 100},
        {value: 2000},
        {value: 800},
        {value: 900},
        {value: 200},
        {value: 400},
      ]}
    />
  );
};

export const SampleSparkline = ({theme} = {theme: 'Default'}) => {
  return (
    <Sparkline
      theme={theme}
      series={[
        {
          data: [
            {x: 0, y: 100},
            {x: 1, y: 200},
            {x: 2, y: 300},
            {x: 3, y: 400},
            {x: 4, y: 400},
            {x: 5, y: 1000},
            {x: 6, y: 200},
            {x: 7, y: 800},
            {x: 8, y: 900},
            {x: 9, y: 200},
            {x: 10, y: 400},
          ],
        },
        {
          lineStyle: 'dashed',
          data: [
            {x: 0, y: 200},
            {x: 1, y: 200},
            {x: 2, y: 200},
            {x: 3, y: 200},
            {x: 4, y: 200},
            {x: 5, y: 200},
            {x: 6, y: 200},
            {x: 7, y: 200},
            {x: 8, y: 200},
            {x: 9, y: 200},
            {x: 10, y: 200},
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

export const SampleMultiseriesBarChart = ({theme} = {theme: 'Default'}) => {
  return (
    <MultiSeriesBarChart
      series={generateMultipleSeries(3)}
      xAxisOptions={{
        labels: generateLabels(2),
      }}
      theme={theme}
    />
  );
};

export const SampleStackedAreaChart = ({theme} = {theme: 'Default'}) => {
  return (
    <StackedAreaChart
      series={generateMultipleSeries(3, 3)}
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
