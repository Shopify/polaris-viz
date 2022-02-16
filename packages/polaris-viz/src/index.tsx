import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

export {
  SparkLineChart,
  SparkBarChart,
  SimpleNormalizedChart,
  LineChart,
  LineChartTooltipContent,
  StackedAreaChart,
  Legend,
  BarChart,
  TooltipContent,
  LinePreview,
  SquareColorPreview,
  SimpleBarChart,
  LinearGradientWithStops,
  PolarisVizProvider,
} from './components';

export type {
  SparkBarChartProps,
  SimpleNormalizedChartProps,
  LineChartProps,
  LineChartTooltipContentProps,
  StackedAreaChartProps,
  BarChartProps,
  TooltipContentProps,
  SimpleBarChartProps,
} from './components';

export {
  DEFAULT_THEME as PolarisVizDefaultTheme,
  LIGHT_THEME as PolarisVizLightTheme,
  PRINT_THEME as PolarisVizPrintTheme,
} from './constants';

export {createTheme} from '@shopify/polaris-viz-core';

export type {GradientStop, Color, DataSeries, DataPoint} from './types';
