import type {TooltipData} from '../TooltipContent';
import type {LabelFormatter} from '../../types';

export interface XAxisOptions {
  labelFormatter?: LabelFormatter;
  hide?: boolean;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}
