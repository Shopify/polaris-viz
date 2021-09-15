import type {Data} from 'types';

const HIGHEST_ALPHA = 0.25;

export function getGradientDetails(data: Data[]) {
  const max = Math.max(...data.map(({rawValue}) => rawValue), 0);
  const min = Math.min(...data.map(({rawValue}) => rawValue), 0);
  const allNegatives = max <= 0 && min <= 0;
  const allPositives = min === 0 && max >= 0;

  if (allPositives) {
    return [
      {offset: 0, stopOpacity: HIGHEST_ALPHA},
      {offset: 100, stopOpacity: 0},
    ];
  } else if (allNegatives) {
    return [
      {offset: 0, stopOpacity: 0},
      {offset: 100, stopOpacity: HIGHEST_ALPHA},
    ];
  } else {
    const range = max - min;
    const negativeStartPercent = ((0 - min) * 100) / range;
    const zeroPercentLine = 100 - negativeStartPercent;

    return [
      {offset: 0, stopOpacity: HIGHEST_ALPHA},
      {offset: zeroPercentLine, stopOpacity: 0},
      {offset: 100, stopOpacity: HIGHEST_ALPHA},
    ];
  }
}
