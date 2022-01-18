import type {Color} from '../../types';

export type LegendIconType = 'solid' | 'line';

export interface LegendData {
  name: string;
  color: Color;
  isComparison?: boolean;
  iconType?: LegendIconType;
}
