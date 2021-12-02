import type {TooltipData} from 'components/TooltipContent';
import type {LabelFormatter} from 'types';

export interface RenderTooltipContentData {
  data: TooltipData[];
  title?: string;
  annotation?: Annotation;
}

export interface XAxisOptions {
  labelFormatter?: LabelFormatter;
  hide?: boolean;
  wrapLabels?: boolean;
}

export interface YAxisOptions {
  labelFormatter: LabelFormatter;
  integersOnly: boolean;
}

export interface Annotation {
  dataSeriesIndex: number;
  dataPointIndex: number;
  width: number;
  color: string;
  tooltipData?: {
    label: string;
    value: string;
  };
  ariaLabel?: string;
  offset?: number;
}

export interface AnnotationLookupTable {
  [key: number]: Annotation;
}
