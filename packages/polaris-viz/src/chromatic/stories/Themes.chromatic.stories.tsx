import React from 'react';
import {storiesOf} from '@storybook/react';
import {
  BarChart,
  LineChart,
  PolarisVizProvider,
  SparkBarChart,
  SparkLineChart,
  StackedAreaChart,
} from '../../components';
import {DEFAULT_THEME, LIGHT_THEME} from '@shopify/polaris-viz-core';

const STORIES = [
  'Shared',
  'BarChart',
  'LineChart',
  'StackedAreaChart',
  'SparkLineChart',
  'SparkBarChart',
];

const VALUES_FOR_CHARTS = {
  Shared: ['chartContainer', 'legend'],
  BarChart: ['grid', 'bar', 'xAxis', 'yAxis'],
  LineChart: ['grid', 'line', 'xAxis', 'yAxis'],
  StackedAreaChart: ['grid', 'line', 'xAxis', 'yAxis'],
  SparkLineChart: ['line'],
  SparkBarChart: ['bar'],
};

const COMPONENTS = {
  Shared: BarChart,
  BarChart: BarChart,
  LineChart: LineChart,
  StackedAreaChart: StackedAreaChart,
  SparkLineChart: SparkLineChart,
  SparkBarChart: SparkBarChart,
};

const DEFAULT_THEMES = {
  Default: DEFAULT_THEME,
  Light: LIGHT_THEME,
};

const THEME = {
  chartContainer: {
    borderRadius: [10],
    padding: [20],
    backgroundColor: ['green'],
  },
  grid: {
    showHorizontalLines: [false],
    color: ['green'],
    horizontalOverflow: [false],
    horizontalMargin: [0, 20],
  },
  bar: {
    borderRadius: [0, 5, 10],
    zeroValueColor: ['lime'],
  },
  xAxis: {
    labelColor: ['lime'],
    hide: [true],
  },
  yAxis: {
    backgroundColor: ['lime'],
    labelColor: ['lime'],
  },
  line: {
    hasArea: [false],
    hasSpline: [false],
    width: [10],
  },
  legend: {
    valueColor: ['lime'],
    labelColor: ['lime'],
    backgroundColor: ['lime'],
  },
};

const DATA = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: 4},
      {key: 'Thursday', value: 8},
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
];

STORIES.forEach((chart) => {
  VALUES_FOR_CHARTS[chart].forEach((themeProperty) => {
    Object.keys(THEME[themeProperty]).forEach((themeValue) => {
      ['Default', 'Light'].forEach((themeName) => {
        const stories = storiesOf(
          `Chromatic/Themes/${chart}/${themeName}/${themeProperty}`,
          module,
        ).addParameters({chromatic: {disableSnapshot: false}});

        ['default', ...THEME[themeProperty][themeValue]].forEach((option) => {
          const value =
            option === 'default'
              ? DEFAULT_THEMES[themeName][themeProperty][themeValue]
              : option;

          stories.add(`${themeValue}: ${value}`, () => {
            const Chart = COMPONENTS[chart];

            const isSpark = chart.includes('Spark');

            const data = DATA.map((series) => {
              return {
                ...series,
                data: series.data.map(({key, value}, index) => {
                  return {
                    key: isSpark ? index : key,
                    value,
                  };
                }),
              };
            });

            return (
              <div
                style={{
                  width: isSpark ? 200 : 800,
                  height: isSpark ? 100 : 500,
                  padding: 20,
                  background: '#e1e1e1',
                }}
              >
                <PolarisVizProvider
                  themes={{
                    [themeName]: {
                      [themeProperty]: {
                        [themeValue]: value,
                      },
                    },
                  }}
                >
                  <Chart data={data} isAnimated={false} theme={themeName} />
                </PolarisVizProvider>
              </div>
            );
          });
        });
      });
    });
  });
});
