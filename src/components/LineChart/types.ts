import type {LineStyle, Color, DataSeries} from '../../types';

export type DataWithDefaults = DataSeries & {
  color: Color;
  lineStyle: LineStyle;
  areaColor?: string | null;
};

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
