import {Color} from 'types';

export interface Data {
  label: string;
  rawValue: number | null;
}

export interface Series {
  name: string;
  data: Data[];
  color?: Color;
}

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}
