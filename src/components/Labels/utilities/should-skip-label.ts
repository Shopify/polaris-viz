export function shouldSkipLabel(index: number, minimalLabelIndexes?: number[]) {
  if (minimalLabelIndexes == null) {
    return false;
  }

  if (!minimalLabelIndexes.includes(index)) {
    return null;
  }
}
