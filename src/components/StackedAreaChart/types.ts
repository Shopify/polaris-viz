import type {Color, Data, DataSeries} from '../../types';

export type Series = DataSeries<Data, Color>;

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}
