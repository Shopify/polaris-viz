export interface Annotation {
  dataSeriesIndex: number;
  dataPointIndex: number;
  width: number;
  color: string;
  tooltipData?: {
    key: string;
    value: string;
  };
  ariaLabel?: string;
  offset?: number;
}

export interface AnnotationLookupTable {
  [key: number]: Annotation;
}
