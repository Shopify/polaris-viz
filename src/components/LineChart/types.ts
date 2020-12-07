import {Color} from 'types';

export type LineStyle = 'dashed' | 'solid';

export interface Series {
  data: {
    label: string;
    rawValue: number;
  }[];
  name: string;
  style?: Partial<{
    color: Color;
    lineStyle: LineStyle;
  }>;
}
