import {RoundedBorder} from '@shopify/polaris-viz-core';

export function getRoundedBorderForStackedValues(
  values: number[],
  groupIndex: number,
): RoundedBorder {
  const highestIndex = getIndex(values, (value) => value > 0);
  const lowestIndex = getIndex(values, (value) => value < 0);

  if (groupIndex === highestIndex) {
    return RoundedBorder.Top;
  }

  if (groupIndex === lowestIndex) {
    return RoundedBorder.Bottom;
  }

  return RoundedBorder.None;
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
