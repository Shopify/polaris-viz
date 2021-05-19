import {Data} from '../types';

export function shouldRotateZeroBars(data: Data[]) {
  let allValuesZero = true;

  const allValuesLessThanOne = data.every(({rawValue}) => {
    if (rawValue !== 0) {
      allValuesZero = false;
    }

    if (rawValue > 0) {
      return false;
    }

    return true;
  });

  return allValuesLessThanOne && !allValuesZero;
}
