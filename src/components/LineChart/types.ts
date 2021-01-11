import {Color} from 'types';

export type LineStyle = 'dashed' | 'solid';

export interface LineChartStyle {
  color: Color;
  lineStyle: LineStyle;
}

export interface Series {
  name: string;
  data: {
    label: string;
    rawValue: number;
  }[];
  style?: Partial<LineChartStyle>;
}

interface TooltipData {
  name: string;
  point: {
    label: string;
    value: number;
  };
  style?: Partial<LineChartStyle>;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}
