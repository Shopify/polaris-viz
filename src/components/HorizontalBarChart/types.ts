import type {Color} from '../../types';

export interface XAxisOptions {
  labelFormatter: (value: string | number) => string;
  hide?: boolean;
}

export interface YAxisOptions {
  labels: string[];
}

export interface Data {
  rawValue: number;
  color?: Color;
}

export interface Series {
  label: string;
  data: Data[];
  color?: Color;
}

export enum Size {
  Small,
  Medium,
  Large,
}
export type Sizes = Size;
