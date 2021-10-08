import type {Color} from '../../types';

export interface XAxisOptions {
  labelFormatter: (value: string | number) => string;
  hide?: boolean;
}

export interface Data {
  label: string;
  rawValue: number;
  color?: Color;
}

export type NullableData = Data | null | undefined;

export interface Series {
  name: string;
  data: NullableData[];
}

export interface ColorOverrides {
  id: string;
  color: Color;
}
