import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {useTheme, getSeriesColors} from '../../../../hooks';
import {
  LegendContainer,
  useLegend,
} from '../../../../components/LegendContainer';
import {
  SparkLineChart,
  LineChart,
  BarChart,
  StackedAreaChart,
  SimpleNormalizedChart,
} from '../../../../components';
import {generateMultipleSeries} from '../../../Docs/utilities';

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

export const SampleLineChart = (
  {theme, showLegend = true} = {theme: 'Default'},
) => {
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
      showLegend={showLegend}
    />
  );
};

export const SampleBarChart = (
  {theme, seriesLength = 3, showLegend = true} = {theme: 'Default'},
) => {
  return (
    <BarChart
      data={generateMultipleSeries(seriesLength)}
      theme={theme}
      showLegend={showLegend}
    />
  );
};

export const SampleStackedAreaChart = (
  {theme, seriesLength = 3, showLegend = true} = {theme: 'Default'},
) => {
  return (
    <StackedAreaChart
      data={generateMultipleSeries(seriesLength, 3)}
      showLegend={showLegend}
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
          name: 'Direct',
          data: [
            {
              key: 'April 2022',
              value: 200,
            },
          ],
        },
        {
          name: 'Facebook',
          data: [
            {
              key: 'April 2022',
              value: 100,
            },
          ],
        },
        {
          name: 'Twitter',
          data: [
            {
              key: 'April 2022',
              value: 100,
            },
          ],
        },
        {
          name: 'Google',
          data: [
            {
              key: 'April 2022',
              value: 20,
            },
          ],
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
  const colors = getSeriesColors(6, selectedTheme);
  const {legend} = useLegend({
    data: [
      {
        shape: 'Line',
        series: [
          {
            name: 'Breakfast',
            data: [{key: 'Monday', value: 3}],
          },
          {
            name: 'Lunch',
            data: [{key: 'Monday', value: 4}],
          },
          {
            name: 'Dinner',
            data: [{key: 'Monday', value: 7}],
          },
        ],
      },
      {
        shape: 'Bar',
        series: [
          {
            name: 'Sunday',
            data: [{key: 'Monday', value: 3}],
          },
          {
            name: 'Monday',
            data: [{key: 'Monday', value: 4}],
          },
          {
            name: 'Tuesday',
            data: [{key: 'Monday', value: 7}],
          },
        ],
      },
    ],
    showLegend: true,
    dimensions: {height: 0, width: 0},
    colors,
  });

  return (
    <SimpleContainer>
      <div style={{marginTop: -16}}>
        <LegendContainer
          colorVisionType=""
          data={legend}
          onDimensionChange={() => {}}
        />
      </div>
    </SimpleContainer>
  );
};

export const SampleLabelsBarChart = ({width = 760}: {width: number}) => {
  return (
    <SimpleContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <div style={{height: 200, width}}>
          <BarChart data={generateMultipleSeries(3)} showLegend={false} />
        </div>
      </div>
    </SimpleContainer>
  );
};
