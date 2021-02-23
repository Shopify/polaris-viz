import {Data} from '../../../../../types';

const HIGHEST_ALPHA = 0.25;

export function getGradientDetails(data: Data[]) {
  const max = Math.max(...data.map(({rawValue}) => rawValue), 0);
  const min = Math.min(...data.map(({rawValue}) => rawValue), 0);
  const allNegatives = max <= 0 && min <= 0;
  const allPositives = min === 0 && max >= 0;

  if (allPositives) {
    return [
      {percent: 0, alpha: HIGHEST_ALPHA},
      {percent: 100, alpha: 0},
    ];
  } else if (allNegatives) {
    return [
      {percent: 0, alpha: 0},
      {percent: 100, alpha: HIGHEST_ALPHA},
    ];
  } else {
    const range = max - min;
    const negativeStartPercent = ((0 - min) * 100) / range;
    const zeroPercentLine = 100 - negativeStartPercent;

    return [
      {percent: 0, alpha: HIGHEST_ALPHA},
      {percent: zeroPercentLine, alpha: 0},
      {percent: 100, alpha: HIGHEST_ALPHA},
    ];
  }
}
