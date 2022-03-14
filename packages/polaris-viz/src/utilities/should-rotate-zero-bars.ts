import type {DataPoint} from '@shopify/polaris-viz-core';

export function shouldRotateZeroBars(data: DataPoint[]) {
  let allValuesZero = true;

  const allValuesLessThanOne = data.every(({value}) => {
    if (value !== 0) {
      allValuesZero = false;
    }

    if (value !== null && value > 0) {
      return false;
    }

    return true;
  });

  return allValuesLessThanOne && !allValuesZero;
}
