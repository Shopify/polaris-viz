export function shouldSkipLabel(index: number, reducedLabelIndexes?: number[]) {
  if (reducedLabelIndexes == null || reducedLabelIndexes.length === 0) {
    return false;
  }

  if (!reducedLabelIndexes.includes(index)) {
    return true;
  }

  return false;
}
