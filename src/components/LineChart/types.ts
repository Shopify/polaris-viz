import {Color} from 'types';

export interface Series {
  data: {
    x: string;
    y: number;
  }[];
  name: string;
  formatY?(value: number): string;
  style?: Partial<{
    color: Color;
    lineStyle: 'dashed' | 'solid';
  }>;
}
