import type {ReactNode} from 'react';
import type {Interpolation, InterpolatorFn} from '@react-spring/web';
import type {
  Color,
  DataSeries,
  Shape,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import type {Series, SeriesPoint} from 'd3-shape';

export interface YAxisTick {
  value: number;
  formattedValue: string;
  yOffset: number;
}

export interface SparkChartData {
  value: number | null;
}

export type PathInterpolator = InterpolatorFn<readonly number[], string>;
export type NumberInterpolator = InterpolatorFn<readonly number[], number>;

// === Theme types === //
export enum BarMargin {
  Small = 0.05,
  Medium = 0.1,
  Large = 0.3,
  None = 0,
}

export interface Margin {
  Top: number;
  Left: number;
  Right: number;
  Bottom: number;
}

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

export type GradientUnits = 'userSpaceOnUse' | 'objectBoundingBox';

export type AnimatedCoordinate = Interpolation<
  number,
  | DOMPoint
  | {
      x: number;
      y: number;
    }
>;

export interface RenderTooltipDataPoint {
  color?: Color;
  isComparison?: boolean;
  key: number | string;
  value: number | string | null;
}

export interface TooltipFormatters {
  valueFormatter?: LabelFormatter;
  keyFormatter?: LabelFormatter;
  titleFormatter?: LabelFormatter;
}

export interface RenderTooltipContentData {
  data: {
    shape: Shape;
    data: RenderTooltipDataPoint[];
    name?: string;
  }[];
  activeIndex: number;
  dataSeries: DataSeries[];
  title?: string;
  formatters?: TooltipFormatters;
}

export interface TooltipData {
  shape: Shape;
  data: {
    key: string;
    value: string;
    color?: Color;
    isComparison?: boolean;
  }[];
  name?: string;
}

export interface TooltipOptions extends TooltipFormatters {
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
}

export interface PreparedLabels {
  text: string;
  words: {word: string; wordWidth: number}[];
  truncatedWords: string[];
  truncatedName: string;
  truncatedWidth: number;
}

export interface FormattedLine {
  height: number;
  truncatedText: string;
  fullText: string;
  textAnchor: string;
  width: number;
  x: number;
  y: number;
  dominantBaseline?: string;
  transform?: string;
}

export interface LegendData {
  name: string;
  color: Color;
  isComparison?: boolean;
  shape?: Shape;
  value?: string;
}

export interface Annotation {
  axis: 'x' | 'y';
  label: string;
  startKey: string | number;
  endKey?: string | number;
  collapseButtonText?: string;
  expandButtonText?: string;
  content?: {
    content: string;
    linkText?: string;
    linkUrl?: string;
    title?: string;
  };
}

export interface ComboAnnotation extends Omit<Annotation, 'axis'> {
  axis: 'x' | 'y1' | 'y2';
}

export interface AnnotationLookupTable {
  [key: number]: Annotation;
}

export type GetXPosition = ({
  isCrosshair,
  index,
}: {
  isCrosshair: boolean;
  index?: number | null;
}) =>
  | number
  | Interpolation<
      | DOMPoint
      | {
          x: number;
          y: number;
        },
      number
    >;

export interface FormattedTicks {
  value: number;
  formattedValue: string;
  yOffset: number;
}

export type LegendPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left';

export interface ColorVisionInteractionMethods {
  getColorVisionEventAttrs: (
    index: number,
  ) => React.HTMLAttributes<HTMLElement>;
  getColorVisionStyles: (index: number) => React.CSSProperties;
}

export type RenderLegendContent = (
  colorVisionInteractionMethods: ColorVisionInteractionMethods,
) => ReactNode;

export type SortedBarChartData = (number | null)[][];

export type RenderInnerValueContent = (
  values: {
    activeValue: number | null;
    totalValue: number;
  },
  getAnimatedTotalValue: (styles: React.CSSProperties) => ReactNode,
) => ReactNode;
