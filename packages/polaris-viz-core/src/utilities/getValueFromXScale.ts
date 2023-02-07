import type {ScaleBand, ScaleLinear} from 'd3-scale';
import {scaleLinear} from 'd3-scale';

export function getValueFromXScale(
  index: number | string,
  xScale: ScaleLinear<number, number> | ScaleBand<string>,
) {
  if (xScale instanceof scaleLinear) {
    return (xScale as ScaleLinear<number, number>)(Number(index)) ?? 0;
  }

  return (xScale as ScaleBand<string>)(`${index}`) ?? 0;
}
