export {
  SparkLineChart,
  SparkBarChart,
  SimpleNormalizedChart,
  LineChart,
  StackedAreaChart,
  Legend,
  BarChart,
  FunnelChart,
  LinePreview,
  SquareColorPreview,
  SimpleBarChart,
  PolarisVizProvider,
  TooltipContent,
  ChartSkeleton,
} from './components';

export type {
  SparkLineChartProps,
  SimpleNormalizedChartProps,
  LineChartProps,
  StackedAreaChartProps,
  BarChartProps,
  SimpleBarChartProps,
  TooltipContentProps,
} from './components';

export {
  DEFAULT_THEME as PolarisVizDefaultTheme,
  LIGHT_THEME as PolarisVizLightTheme,
  PRINT_THEME as PolarisVizPrintTheme,
} from './constants';

export type {TooltipData} from './types';

export {
  createGradient,
  curveStepRounded,
  getFilteredSeries,
  getSeriesColors,
  isGradientType,
  uniqueId,
  createTheme,
  getColorVisionStylesForActiveIndex,
  getColorVisionEventAttrs,
  changeColorOpacity,
  changeGradientOpacity,
  getAverageColor,
  paddingStringToObject,
  removeFalsyValues,
} from '@shopify/polaris-viz-core';

export type {
  Color,
  BarTheme,
  DataSeries,
  Theme,
  PartialTheme,
  GradientStop,
  DataPoint,
  ChartState,
} from '@shopify/polaris-viz-core';
