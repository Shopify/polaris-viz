import type {Series, SeriesPoint} from 'd3-shape';
import type {SVGProps} from 'react';

export type LabelFormatter = (value: string | number | null) => string;

export interface DataPoint {
  key: number | string;
  value: number | null;
}

export interface DataSeries {
  data: DataPoint[];
  color?: Color;
  isComparison?: boolean;
  name?: string;
  metadata?: {[key: string]: any};
  styleOverride?: StyleOverride;
}

interface StyleOverride {
  line?: {
    hasArea?: boolean;
    width?: number;
    strokeDasharray?: string;
  };
}

export interface DataGroup {
  shape: Shape;
  series: DataSeries[];
  name?: string;
  yAxisOptions?: YAxisOptions;
}

export type Shape = 'Line' | 'Bar';

export type LineStyle = 'solid' | 'dotted';

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
}

// === Theme types === //

export interface GridTheme {
  showHorizontalLines: boolean;
  horizontalOverflow: boolean;
  color: string;
  horizontalMargin: number;
}

export interface ArcTheme {
  cornerRadius: number;
  thickness: number;
}

export interface BarTheme {
  zeroValueColor: string;
  borderRadius: number;
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
  upToFour: Color[];
  fromFiveToSeven: Color[];
  all: Color[];
}
export interface LegendTheme {
  labelColor: string;
  valueColor: string;
  backgroundColor: string;
  trendIndicator: {positive: string; negative: string; neutral: string};
}

export interface TrendIndicatorTheme {
  positive: string;
  negative: string;
  neutral: string;
  background: string;
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
  Combo = 'Combo',
  Line = 'Line',
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
