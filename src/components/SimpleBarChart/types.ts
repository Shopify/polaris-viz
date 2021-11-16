import type {Color} from '../../types';

export type LabelFormatter = (value: string | number) => string;

export interface XAxisOptions {
  labelFormatter?: LabelFormatter;
}

export interface ColorOverrides {
  id: string;
  color: Color;
}
