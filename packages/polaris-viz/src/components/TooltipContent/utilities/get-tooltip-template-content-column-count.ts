import type {TooltipData} from '../../../types';

const DEFAULT_COLUMN_COUNT = 2;

export function getTooltipContentTemplateColumnCount(data: TooltipData) {
  const hasTrend = data.data.some(({trend}) => trend != null);
  const hasColor = data.data.some(({color}) => color != null);

  return DEFAULT_COLUMN_COUNT + (hasColor ? 1 : 0) + (hasTrend ? 1 : 0);
}
