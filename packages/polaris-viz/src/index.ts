export {SparkLineChart} from './components/SparkLineChart/SparkLineChart';
export {SparkBarChart} from './components/SparkBarChart/SparkBarChart';
export {SimpleNormalizedChart} from './components/SimpleNormalizedChart/SimpleNormalizedChart';
export {LineChart} from './components/LineChart/LineChart';
export {StackedAreaChart} from './components/StackedAreaChart/StackedAreaChart';
export {Legend} from './components/Legend/Legend';
export {BarChart} from './components/BarChart/BarChart';
export {FunnelChart} from './components/FunnelChart/FunnelChart';
export {LinePreview} from './components/LinePreview/LinePreview';
export {SquareColorPreview} from './components/SquareColorPreview/SquareColorPreview';
export {SimpleBarChart} from './components/SimpleBarChart/SimpleBarChart';
export {PolarisVizProvider} from './components/PolarisVizProvider/PolarisVizProvider';
export {TooltipContent} from './components/TooltipContent/TooltipContent';
export {ChartSkeleton} from './components/ChartSkeleton/ChartSkeleton';
export {ComboChart} from './components/ComboChart/ComboChart';
export {DonutChart} from './components/DonutChart/DonutChart';
export {TrendIndicator} from './components/TrendIndicator/TrendIndicator';
export {LineChartRelational} from './components/LineChartRelational/LineChartRelational';
export {LineChartPredictive} from './components/LineChartPredictive/LineChartPredictive';
export {MissingDataArea} from './components/LineChartRelational/components/MissingDataArea/MissingDataArea';
export {Grid} from './components/Grid/Grid';

export type {SparkLineChartProps} from './components/SparkLineChart/SparkLineChart';
export type {SimpleNormalizedChartProps} from './components/SimpleNormalizedChart/SimpleNormalizedChart';
export type {LineChartProps} from './components/LineChart/LineChart';
export type {StackedAreaChartProps} from './components/StackedAreaChart/StackedAreaChart';
export type {BarChartProps} from './components/BarChart/BarChart';
export type {SimpleBarChartProps} from './components/SimpleBarChart/SimpleBarChart';
export type {TooltipContentProps} from './components/TooltipContent/TooltipContent';
export type {ComboChartProps} from './components/ComboChart/ComboChart';
export type {LineChartPredictiveProps} from './components/LineChartPredictive/types';
export type {TrendIndicatorProps} from './components/TrendIndicator/TrendIndicator';
export type {DonutChartProps} from './components/DonutChart/DonutChart';
export type {ComparisonMetricProps} from './components/ComparisonMetric/ComparisonMetric';
export type {LineChartRelationalProps} from './components/LineChartRelational/LineChartRelational';
export type {GridProps} from './components/Grid/Grid';

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
  Trend,
  TrendDirection,
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
} from '@shopify/polaris-viz-core';

export {renderLinearTooltipContent} from './utilities/renderLinearTooltipContent';
export {setSingleSeriesActive} from './utilities/setSingleSeriesActive';
export {fillMissingDataPoints} from './utilities/fillMissingDataPoints';

export {getTooltipContentRenderer} from './utilities/getTooltipContentRenderer';

export {
  useWatchActiveSeries,
  setActiveSeriesListener,
} from './hooks/useWatchActiveSeries';

export {setHiddenItems} from './hooks/ExternalEvents/utilities/setHiddenItems';
