export interface Dimensions {
  width: number;
  height: number;
}

export type DonutChartColors =
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'magenta'
  | 'orange'
  | 'yellow'
  | 'sky';

export interface ArcData {
  id: number;
  label: string;
  value: number;
  count?: number;
  color: DonutChartColors;
}
