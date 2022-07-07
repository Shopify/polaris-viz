interface Props {
  doesOneChartContainAllNegativeValues: boolean;
  shouldPlaceZeroInMiddleOfChart: boolean;
  ticksLength: number;
  zeroIndex: number;
}

export function getTicksBetweenZeroAndMax({
  doesOneChartContainAllNegativeValues,
  shouldPlaceZeroInMiddleOfChart,
  ticksLength,
  zeroIndex,
}: Props) {
  if (!shouldPlaceZeroInMiddleOfChart && doesOneChartContainAllNegativeValues) {
    return ticksLength;
  }

  return ticksLength - zeroIndex;
}
