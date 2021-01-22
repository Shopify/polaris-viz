import type {Color} from 'types';

type Data = number | null;

export interface Series {
  label: string;
  data: Data[];
  color: Color;
}

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}
