import type {FormattedTicks} from '../../../types';

interface Props {
  doesOneChartContainAllNegativeValues: boolean;
  shouldPlaceZeroInMiddleOfChart: boolean;
  ticks: FormattedTicks[];
}

export function getZeroIndex({
  doesOneChartContainAllNegativeValues,
  shouldPlaceZeroInMiddleOfChart,
  ticks,
}: Props) {
  const ticksLength = ticks.length - 1;

  if (shouldPlaceZeroInMiddleOfChart) {
    return Math.floor(ticksLength / 2);
  }

  if (doesOneChartContainAllNegativeValues) {
    return ticksLength;
  }

  return ticks.findIndex(({value}) => value === 0);
}
