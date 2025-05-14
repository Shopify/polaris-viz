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
  LineChartCumulative,
  MissingDataArea,
  Grid,
  FunnelChartNext,
  SparkFunnelChart,
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
  LineChartRelationalProps,
  GridProps,
  FunnelChartNextProps,
  SparkFunnelChartProps,
  LineChartCumulativeProps,
} from './components';

export {
  DARK_THEME as PolarisVizDarkTheme,
  LIGHT_THEME as PolarisVizLightTheme,
  PRINT_THEME as PolarisVizPrintTheme,
} from './constants';

export type {
  ColorVisionInteractionMethods,
  InnerValueContents,
  RenderInnerValueContent,
  TooltipData,
  RenderTooltipContentData,
  RenderLegendContent,
  TooltipOptions,
  ColorVisionEventReturn,
  Annotation,
  LineChartSlotProps,
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
  Trend,
  TrendDirection,
} from '@shopify/polaris-viz-core';

export {
  renderLinearTooltipContent,
  setSingleSeriesActive,
  fillMissingDataPoints,
} from './utilities';

export {getTooltipContentRenderer} from './utilities/getTooltipContentRenderer';

export {
  useWatchActiveSeries,
  setActiveSeriesListener,
  setHiddenItems,
} from './hooks';
