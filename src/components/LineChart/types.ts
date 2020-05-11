import {Color} from 'types';

export type LineStyle = 'dashed' | 'solid';

export interface Series {
  data: {
    x: string;
    y: number;
  }[];
  name: string;
  formatY?(value: number): string;
  style?: Partial<{
    color: Color;
    lineStyle: LineStyle;
  }>;
}
