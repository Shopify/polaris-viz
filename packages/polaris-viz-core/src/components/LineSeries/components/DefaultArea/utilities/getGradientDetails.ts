import type {DataPoint} from '../../../../../types';

const HIGHEST_ALPHA = 0.25;

export function getGradientDetails(data: DataPoint[]) {
  const values = data.map(({value}) => value).filter(Boolean) as number[];

  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const allNegatives = max <= 0 && min <= 0;
  const allPositives = min === 0 && max >= 0;

  console.log({allNegatives, allPositives, min, max});

  return [
    {offset: 0, stopOpacity: HIGHEST_ALPHA},
    {offset: 100, stopOpacity: 0},
  ];
}
