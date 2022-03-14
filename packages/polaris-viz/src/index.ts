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
  PolarisVizProvider,
} from './components';

export type {
  SparkLineChartProps,
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

export {
  createGradient,
  curveStepRounded,
  getFilteredSeries,
  getSeriesColors,
  isGradientType,
  uniqueId,
  createTheme,
} from '@shopify/polaris-viz-core';

export type {
  Color,
  BarTheme,
  DataSeries,
  Theme,
  PartialTheme,
  GradientStop,
  DataPoint,
} from '@shopify/polaris-viz-core';
