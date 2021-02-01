import {Color, DataSeries, NullableData} from '../../types';

export interface Series extends DataSeries<NullableData> {}

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}
