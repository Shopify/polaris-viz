import type {InterpolatorFn} from '@react-spring/web';

export interface Data {
  label: string;
  rawValue: number;
}

export interface NullableData {
  label: string;
  rawValue: number | null;
}

export type LineStyle = 'dashed' | 'solid' | 'dotted';

export interface DataSeries<T, C> {
  name: string;
  data: T[];
  color?: C;
}

export interface GradientStop {
  offset: number;
  color: string;
  stopOpacity?: number;
}

export type StringLabelFormatter = (
  value: string,
  index?: number,
  data?: string[],
) => string;

export type NumberLabelFormatter = (value: number) => string;

export interface ActiveTooltip {
  x: number;
  y: number;
  index: number;
}

export interface GradientStop {
  offset: number;
  color: string;
}

export interface YAxisTick {
  value: number;
  formattedValue: string;
  yOffset: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type SparkChartData = number | null;

export type PathInterpolator = InterpolatorFn<readonly number[], string>;
export type NumberInterpolator = InterpolatorFn<readonly number[], number>;
export type Color = string | GradientStop[];

export interface XAxisOptions {
  labelFormatter?: StringLabelFormatter;
  useMinimalLabels?: boolean;
}
export interface YAxisOptions {
  labelFormatter?: NumberLabelFormatter;
  integersOnly?: boolean;
}

// === Theme types === //
export enum BarMargin {
  Small = 0.05,
  Medium = 0.1,
  Large = 0.3,
  None = 0,
}

export interface GridTheme {
  showHorizontalLines: boolean;
  showVerticalLines: boolean;
  horizontalOverflow: boolean;
  color: string;
  horizontalMargin: number;
}

export interface BarTheme {
  innerMargin: keyof typeof BarMargin;
  outerMargin: keyof typeof BarMargin;
  hasRoundedCorners: boolean;
  /**
   * @deprecated This prop is experimental and not ready for general use. If you want to use this, come talk to us in #polaris-data-viz
   */
  zeroAsMinHeight: boolean;
}

export interface XAxisTheme {
  showTicks: boolean;
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

export interface ChartContainerTheme {
  borderRadius: string;
  padding: string;
  backgroundColor: string;
}

export interface LineTheme {
  sparkArea: Color | null;
  hasSpline: boolean;
  style: LineStyle;
  hasPoint: boolean;
  width: number;
  pointStroke: string;
  dottedStrokeColor: string;
}
export interface SeriesColors {
  upToFour: Color[];
  fromFiveToSeven: Color[];
  all: Color[];
}

export interface ColorPalette {
  colors: Color[];
}

export interface Legend {
  labelColor: string;
  valueColor: string;
  trendIndicator: {positive: string; negative: string; neutral: string};
}

export interface PartialTheme {
  chartContainer?: Partial<ChartContainerTheme>;
  bar?: Partial<BarTheme>;
  line?: Partial<LineTheme>;
  grid?: Partial<GridTheme>;
  xAxis?: Partial<XAxisTheme>;
  yAxis?: Partial<YAxisTheme>;
  crossHair?: Partial<CrossHairTheme>;
  colorPalette?: Partial<ColorPalette>;
  legend?: Partial<Legend>;
  seriesColors?: Partial<SeriesColors>;
}

export interface Theme {
  chartContainer: ChartContainerTheme;
  bar: BarTheme;
  grid: GridTheme;
  xAxis: XAxisTheme;
  yAxis: YAxisTheme;
  line: LineTheme;
  crossHair: CrossHairTheme;
  legend: Legend;
  colorPalette: ColorPalette;
  seriesColors: SeriesColors;
}
