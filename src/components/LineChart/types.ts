import {Color, DataSeries, Data} from '../../types';

export type LineStyle = 'dashed' | 'solid';

export interface Series extends DataSeries<Data> {
  lineStyle?: LineStyle;
  showArea?: boolean;
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
