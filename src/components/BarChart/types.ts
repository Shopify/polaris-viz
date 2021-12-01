import type {TooltipData} from 'components/TooltipContent';
import type {LabelFormatter} from 'types';

export interface RenderTooltipContentData {
  data: TooltipData[];
  title?: string;
}

export interface XAxisOptions {
  labelFormatter?: LabelFormatter;
  hide?: boolean;
  wrapLabels?: boolean;
}

export interface YAxisOptions {
  labelFormatter: LabelFormatter;
  integersOnly: boolean;
}
