import type {Color, DataSeries} from '../../types';

export type LineStyle = 'dashed' | 'solid';

export interface Series extends DataSeries {
  lineStyle?: LineStyle;
}

interface TooltipData {
  name: string;
  point: {
    label: string;
    value: number;
  };
  color: Color;
  lineStyle: LineStyle;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}
