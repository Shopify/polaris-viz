import {Color} from 'types';

type Data = number | null;

export interface Series {
  label: string;
  data: Data[];
  color: Color;
}
