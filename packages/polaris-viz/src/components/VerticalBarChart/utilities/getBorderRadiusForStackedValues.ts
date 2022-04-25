import {BORDER_RADIUS} from '@shopify/polaris-viz-core';

export function getBorderRadiusForStackedValues(
  values: number[],
  groupIndex: number,
): string {
  const highestIndex = getIndex(values, (value) => value > 0);
  const lowestIndex = getIndex(values, (value) => value < 0);

  if (groupIndex === highestIndex) {
    return BORDER_RADIUS.Top;
  }

  if (groupIndex === lowestIndex) {
    return BORDER_RADIUS.Bottom;
  }

  return BORDER_RADIUS.None;
}

function getIndex(values: number[], checkFn: (value: number) => boolean) {
  let prevIndex = -1;

  const value = values.reduce((prev, cur, curIndex) => {
    if (curIndex > prevIndex && checkFn(cur)) {
      prevIndex = curIndex;
      return cur;
    }

    prevIndex = curIndex;
    return prev;
  }, -1);

  return values.lastIndexOf(value);
}
