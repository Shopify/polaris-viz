import type {DataSeries, NullableData} from '../../types';

export interface Series extends DataSeries<NullableData, string> {}

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: string;
    label: string;
    value: number;
  }[];
}
