import type {Color} from '../../types';

export interface XAxisOptions {
  labelFormatter: (value: string | number) => string;
  hide?: boolean;
}

export interface Data {
  label: string;
  rawValue: number;
  color?: Color;
}

export interface Series {
  name: string;
  data: Data[];
  color?: Color;
}
