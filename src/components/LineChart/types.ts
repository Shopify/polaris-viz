import {Color, DataSeries, Data, LineStyle} from '../../types';

export interface Series extends DataSeries<Data> {
  showArea?: boolean;
  lineStyle?: LineStyle;
}

export interface TooltipData {
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
