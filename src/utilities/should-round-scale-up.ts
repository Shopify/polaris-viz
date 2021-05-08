import {ScaleLinear} from 'd3-scale';

export function shouldRoundScaleUp({
  yScale,
  maxTicks,
  maxValue,
}: {
  yScale: ScaleLinear<number, number>;
  maxTicks: number;
  maxValue: number;
}) {
  const roundedUpTicks = yScale
    .copy()
    .nice(maxTicks)
    .ticks(maxTicks);

  const lastTick = roundedUpTicks[roundedUpTicks.length - 1];
  const secondLastTick = roundedUpTicks[roundedUpTicks.length - 2];
  const tickThreshold = (lastTick - secondLastTick) / 2;
  const shouldRoundScaleUp = maxValue - secondLastTick > tickThreshold;

  return shouldRoundScaleUp;
}
