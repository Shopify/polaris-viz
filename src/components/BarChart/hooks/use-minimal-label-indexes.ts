const MIDDLE_LABEL_EVEN_THRESHOLD = 10;

export function useMinimalLabelIndexes({
  useMinimalLabels,
  dataLength,
}: {
  useMinimalLabels: boolean;
  dataLength: number;
}) {
  if (!useMinimalLabels || dataLength < 2) {
    return {minimalLabelIndexes: null};
  }

  const oddNumberOfBars = dataLength % 2 !== 0;

  const middleLabelIndex =
    oddNumberOfBars || dataLength > MIDDLE_LABEL_EVEN_THRESHOLD
      ? [Math.floor(dataLength / 2)]
      : [];

  return {minimalLabelIndexes: [0, ...middleLabelIndex, dataLength - 1]};
}
