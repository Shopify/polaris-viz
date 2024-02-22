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
  ComboChart,
  DonutChart,
  TrendIndicator,
  LineChartRelational,
  LineChartPredictive,
} from './components';

export type {
  SparkLineChartProps,
  SimpleNormalizedChartProps,
  LineChartProps,
  StackedAreaChartProps,
  BarChartProps,
  SimpleBarChartProps,
  TooltipContentProps,
  ComboChartProps,
  LineChartPredictiveProps,
  TrendIndicatorProps,
  DonutChartProps,
  ComparisonMetricProps,
} from './components';

export {
  DEFAULT_THEME as PolarisVizDefaultTheme,
  LIGHT_THEME as PolarisVizLightTheme,
  PRINT_THEME as PolarisVizPrintTheme,
} from './constants';

export type {
  ColorVisionInteractionMethods,
  InnerValueContents,
  RenderInnerValueContent,
  TooltipData,
  Trend,
  TrendDirection,
  RenderTooltipContentData,
  RenderLegendContent,
  TooltipOptions,
} from './types';

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
  ColorScale,
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

export {renderLinearTooltipContent, setSingleSeriesActive} from './utilities';

export {
  useWatchActiveSeries,
  setHiddenItems,
  useRenderTooltipContent,
} from './hooks';
