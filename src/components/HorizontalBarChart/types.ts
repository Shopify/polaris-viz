import type {TooltipData} from 'components/TooltipContent';

import type {Color} from '../../types';

export type LabelFormatter = (value: string | number) => string;

export interface XAxisOptions {
  labelFormatter?: LabelFormatter;
  hide?: boolean;
}

export interface Data {
  label: string;
  rawValue: number;
  color?: Color;
}

export interface Series {
  name: string;
  data: Data[];
}

export interface ColorOverrides {
  id: string;
  color: Color;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}
