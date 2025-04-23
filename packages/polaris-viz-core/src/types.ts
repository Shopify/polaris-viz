import type {Series, SeriesPoint} from 'd3-shape';
import type {ErrorInfo, SVGProps} from 'react';

export type LabelFormatter = (value: string | number | null) => string;

export interface DataPoint {
  key: number | string;
  value: number | null;
  trend?: TrendIndicator;
}

export interface DataSeries {
  data: DataPoint[];
  color?: Color;
  isComparison?: boolean;
  name?: string;
  metadata?: {[key: string]: any};
  styleOverride?: StyleOverride;
  /**
   * Value that gets used to fill in missing data points. Defaults to `null`.
   */
  fillValue?: DataPoint['value'];
}

interface StyleOverride {
  line?: {
    hasArea?: boolean;
    width?: number;
    strokeDasharray?: string;
  };
  tooltip?: {
    shape?: Shape;
  };
}

export type Trend = 'positive' | 'negative' | 'neutral';
export type TrendDirection = 'upward' | 'downward';

export interface TrendIndicator {
  accessibilityLabel?: string;
  direction?: TrendDirection;
  trend?: Trend;
  value?: string | null;
}

export interface DataGroup {
  shape: Shape;
  series: DataSeries[];
  name?: string;
  yAxisOptions?: YAxisOptions;
}

export type Shape = 'Line' | 'Bar' | 'Donut';

export type LineStyle = 'solid' | 'dotted' | 'dashed';

export interface GradientStop {
  offset: number;
  color: string;
  stopOpacity?: number;
}

export interface ActiveTooltip {
  x: number;
  y: number;
  index: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type BoundingRect = Position & Dimensions;
export type Color = string | GradientStop[];

export interface XAxisOptions {
  labelFormatter?: LabelFormatter;
  hide?: boolean;
  allowLineWrap?: boolean;
}
export interface YAxisOptions {
  labelFormatter?: LabelFormatter;
  integersOnly?: boolean;
  fixedWidth?: number | false;
  maxYOverride?: number | null;
  ticksOverride?: number[] | null;
}

// === Theme types === //

export interface GridTheme {
  showHorizontalLines: boolean;
  horizontalOverflow: boolean;
  color: string;
  horizontalMargin: number;
  verticalOverflow: boolean;
}

export interface ArcTheme {
  cornerRadius: number;
  thickness: number;
}

export interface BarTheme {
  zeroValueColor: string;
  borderRadius: number;
  gap: number | null;
}

export interface XAxisTheme {
  labelColor: string;
  hide: boolean;
}

export interface CrossHairTheme {
  color: string;
  width: number;
}

export interface YAxisTheme {
  labelColor: string;
  backgroundColor: string;
}

export interface GroupLabelTheme {
  hide: boolean;
}

export interface AnnotationsTheme {
  backgroundColor: string;
  textColor: string;
  titleColor: string;
  linkColor: string;
  axisLabelColor: string;
  lineColor: string;
  pillOpacity: number;
}

export interface ChartContainerTheme {
  borderRadius: string;
  padding: string;
  backgroundColor: string;
  sparkChartMinHeight: number;
  minHeight: number;
}

export interface LineTheme {
  hasArea: boolean;
  hasSpline: boolean;
  width: number;
  pointStroke: string;
}

export interface TooltipTheme {
  backgroundColor: string;
  textColor: string;
  titleColor: string;
}
export interface SeriesColors {
  comparison: string;
  empty: Color;
  single: Color;
  all: Color[];
}
export interface LegendTheme {
  labelColor: string;
  valueColor: string;
  backgroundColor: string | null;
  trendIndicator: {positive: string; negative: string; neutral: string};
}

export interface TrendIndicatorTheme {
  positive: string;
  negative: string;
  neutral: string;
}

export interface MissingDataTheme {
  lineColor: string;
}

export interface PartialTheme {
  arc?: Partial<ArcTheme>;
  chartContainer?: Partial<ChartContainerTheme>;
  bar?: Partial<BarTheme>;
  line?: Partial<LineTheme>;
  grid?: Partial<GridTheme>;
  xAxis?: Partial<XAxisTheme>;
  yAxis?: Partial<YAxisTheme>;
  groupLabel?: Partial<GroupLabelTheme>;
  crossHair?: Partial<CrossHairTheme>;
  legend?: Partial<LegendTheme>;
  seriesColors?: Partial<SeriesColors>;
  tooltip?: Partial<TooltipTheme>;
  trendIndicator?: Partial<TrendIndicatorTheme>;
  missingData?: Partial<MissingDataTheme>;
}

export interface Theme {
  annotations: AnnotationsTheme;
  chartContainer: ChartContainerTheme;
  arc: ArcTheme;
  bar: BarTheme;
  grid: GridTheme;
  xAxis: XAxisTheme;
  yAxis: YAxisTheme;
  groupLabel: GroupLabelTheme;
  line: LineTheme;
  crossHair: CrossHairTheme;
  legend: LegendTheme;
  seriesColors: SeriesColors;
  tooltip: TooltipTheme;
  trendIndicator: TrendIndicatorTheme;
  missingData: MissingDataTheme;
}

export enum DataType {
  Point = 'Point',
  BarGroup = 'BarGroup',
  Bar = 'Bar',
  Arc = 'Arc',
}

export type ChartType = 'default' | 'stacked';

export type GradientUnits = 'userSpaceOnUse' | 'objectBoundingBox';

export interface SvgComponents {
  Svg: (props: SVGProps<SVGElement>) => any;
  Circle: (props: SVGProps<SVGCircleElement>) => any;
  Ellipse: (props: SVGProps<SVGEllipseElement>) => any;
  G: (props: SVGProps<SVGGElement>) => any;
  Text: (props: SVGProps<SVGTextElement>) => any;
  TSpan: (props: SVGProps<SVGTSpanElement>) => any;
  TextPath: (props: SVGProps<SVGTextPathElement>) => any;
  Path: (props: SVGProps<SVGPathElement>) => any;
  Polygon: (props: SVGProps<SVGPolygonElement>) => any;
  Polyline: (props: SVGProps<SVGPolylineElement>) => any;
  Line: (props: SVGProps<SVGLineElement>) => any;
  Rect: (props: SVGProps<SVGRectElement>) => any;
  Use: (props: SVGProps<SVGUseElement>) => any;
  Image: (props: SVGProps<SVGImageElement>) => any;
  Symbol: (props: SVGProps<SVGSymbolElement>) => any;
  Defs: (props: SVGProps<SVGDefsElement>) => any;
  LinearGradient: (props: SVGProps<SVGLinearGradientElement>) => any;
  RadialGradient: (props: SVGProps<SVGRadialGradientElement>) => any;
  Stop: (props: SVGProps<SVGStopElement>) => any;
  ClipPath: (props: SVGProps<SVGClipPathElement>) => any;
  Pattern: (props: SVGProps<SVGPatternElement>) => any;
  Mask: (props: SVGProps<SVGMaskElement>) => any;
}

export type Direction = 'horizontal' | 'vertical';
export type StackedSeries = Series<
  {
    [key: string]: number;
  },
  string
>;
export type FormattedStackedSeries = SeriesPoint<{
  [key: string]: number;
}>[];

export interface SingleIndexGap {
  index: number;
  gap: number;
}
export interface StackedBarGapDirections {
  positive: SingleIndexGap[];
  negative: SingleIndexGap[];
}

export interface CharacterWidths {
  [key: string]: number;
}

export interface CharacterWidthOffsets {
  fontSize: {[key: string]: number};
  fontWeight: {[key: string]: number};
}

export type LineChartDataSeriesWithDefaults = DataSeries & {
  color: Color;
  strokeDasharray?: string;
  areaColor?: string | null;
  width?: number;
};

export interface BorderRadius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

export enum ChartState {
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success',
}

export interface ChartProps<T = DataSeries[]> {
  data: T;
  theme?: string;
  id?: string;
  isAnimated?: boolean;
  state?: ChartState;
  errorText?: string;
  onError?: ErrorBoundaryResponse;
}

export type WithRequired<T, K extends keyof T> = T & {[P in K]-?: T[P]};

export type StackedValues = Series<
  {
    [key: string]: number;
  },
  string
>[];

export enum InternalChartType {
  Bar = 'Bar',
  HorizontalBar = 'HorizontalBar',
  Combo = 'Combo',
  Line = 'Line',
  Donut = 'Donut',
}

export enum Hue {
  Teal = 'Teal',
  Blue = 'Blue',
  Indigo = 'Indigo',
  Purple = 'Purple',
  Magenta = 'Magenta',
  Orange = 'Orange',
  Yellow = 'Yellow',
}

export interface TargetLine {
  value: number;
  offsetRight?: number;
  offsetLeft?: number;
}

export type ErrorBoundaryResponse = (
  error: Error,
  errorInfo: ErrorInfo,
) => void;

export interface ComparisonSeriesIndex {
  originalIndex: number;
  comparisonIndex: number;
}
