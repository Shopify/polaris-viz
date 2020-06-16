import {BarData} from '../types';
import {getTextWidth} from '../../../utilities';

export const SPACING = 8;

export function useAxisMargin({
  data,
  formatValue,
}: {
  data: BarData[];
  formatValue(value: number): string;
}) {
  const maxLabelLength = data
    .map(({rawValue}) => getTextWidth(formatValue(rawValue)))
    .reduce((acc, currentValue) => Math.max(acc, currentValue));

  return maxLabelLength + SPACING;
}
