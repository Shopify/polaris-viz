export function shouldSkipLabel(index: number, minimalLabelIndexes?: number[]) {
  if (minimalLabelIndexes == null || minimalLabelIndexes.length === 0) {
    return false;
  }

  if (!minimalLabelIndexes.includes(index)) {
    return true;
  }

  return false;
}
