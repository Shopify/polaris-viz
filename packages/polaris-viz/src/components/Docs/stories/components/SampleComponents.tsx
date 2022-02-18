import React from 'react';
import type {DataSeries} from 'types';

import {useTheme, getSeriesColors} from '../../../../hooks';
import {LegendContainer} from '../../../../components/LegendContainer';
import {
  SparkLineChart,
  LineChart,
  BarChart,
  StackedAreaChart,
  SimpleNormalizedChart,
} from '../../../../components';
import {generateLabels, generateMultipleSeries} from '../../../Docs/utilities';

import {SimpleContainer} from './SimpleContainer';

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
      data={[
        {
          name: 'Sales',
          data: [
            {value: 324.19, key: '2020-01-01'},
            {value: 613.29, key: '2020-01-02'},
            {value: -422.79, key: '2020-01-03'},
            {value: 0, key: '2020-01-04'},
            {value: 1, key: '2020-01-05'},
          ],
        },
      ]}
      xAxisOptions={{
        xAxisLabels: ['Jan. 1', 'Jan. 2', 'Jan. 3', 'Jan. 4', 'Jan. 5'],
      }}
    />
  );
};

export const SampleBarChart = (
  {theme, seriesLength = 3} = {theme: 'Default'},
) => {
  return <BarChart data={generateMultipleSeries(seriesLength)} theme={theme} />;
};

export const SampleStackedAreaChart = (
  {theme, seriesLength = 3} = {theme: 'Default'},
) => {
  return (
    <StackedAreaChart
      data={generateMultipleSeries(seriesLength, 3)}
      xAxisOptions={{
        labels: generateLabels(3),
      }}
      theme={theme}
    />
  );
};

export const SampleSimpleNormalizedChart = ({theme} = {theme: 'Default'}) => {
  return (
    <SimpleNormalizedChart
      direction="vertical"
      theme={theme}
      data={[
        {
          key: 'Direct',
          value: 200,
        },
        {
          key: 'Facebook',
          value: 100,
        },
        {
          key: 'Twitter',
          value: 100,
        },
        {
          key: 'Google',
          value: 20,
        },
      ]}
      labelFormatter={(value) => `$${value}`}
    />
  );
};

export const SampleLegendChart = ({theme} = {theme: 'Default'}) => {
  const data: DataSeries[] = [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: 3},
        {key: 'Tuesday', value: 7},
        {key: 'Wednesday', value: 7},
        {key: 'Thursday', value: 8},
        {key: 'Friday', value: 20},
        {key: 'Saturday', value: 0},
        {key: 'Sunday', value: 0.1},
      ],
    },
    {
      name: 'Lunch',
      data: [
        {key: 'Monday', value: 4},
        {key: 'Tuesday', value: 0},
        {key: 'Wednesday', value: 10},
        {key: 'Thursday', value: 15},
        {key: 'Friday', value: 8},
        {key: 'Saturday', value: 20},
        {key: 'Sunday', value: 2},
      ],
    },
    {
      name: 'Dinner',
      data: [
        {key: 'Monday', value: 7},
        {key: 'Tuesday', value: 0},
        {key: 'Wednesday', value: 15},
        {key: 'Thursday', value: 12},
        {key: 'Friday', value: 20},
        {key: 'Saturday', value: 5},
        {key: 'Sunday', value: 4},
      ],
    },
  ];

  return (
    <SimpleContainer height={300}>
      <BarChart data={data} theme={theme} />
    </SimpleContainer>
  );
};

export const SampleLegendContainer = ({theme} = {theme: 'Default'}) => {
  const selectedTheme = useTheme(theme);
  const colors = getSeriesColors(3, selectedTheme);

  return (
    <SimpleContainer>
      <div style={{marginTop: -16}}>
        <LegendContainer
          colorVisionType=""
          data={[
            {
              name: 'Breakfast',
              color: colors[0],
            },
            {
              name: 'Lunch',
              color: 'green',
            },
            {
              name: 'Dinner',
              color: colors[2],
            },
          ]}
          onHeightChange={() => {}}
        />
      </div>
    </SimpleContainer>
  );
};
