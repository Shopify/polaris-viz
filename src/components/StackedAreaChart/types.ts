import type {Color, Data, LegacyDataSeries} from '../../types';

export type Series = LegacyDataSeries<Data, Color>;

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}
