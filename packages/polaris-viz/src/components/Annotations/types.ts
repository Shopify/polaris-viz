export interface AnnotationPosition {
  index: number;
  line: {
    y: number;
    x: number;
    width?: number;
  };
  row: number;
  width: number;
  x: number;
  y: number;
  showYAxisLabel?: boolean;
}

export type DualAxisYAxis = 'y' | 'y1' | 'y2';
