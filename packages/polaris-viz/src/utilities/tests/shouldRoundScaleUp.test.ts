import {scaleLinear} from 'd3-scale';

import {shouldRoundScaleUp} from '../shouldRoundScaleUp';

describe('shouldRoundScaleUp', () => {
  it('returns false when the max value is less than half way to the last nice tick', () => {
    const yScale = scaleLinear().range([300, 0]).domain([0, 12130]);

    const actual = shouldRoundScaleUp({yScale, maxValue: 12130, maxTicks: 7});
    expect(actual).toBe(false);
  });

  it('returns true when the max value is more than half way to the last nice tick', () => {
    const yScale = scaleLinear().range([300, 0]).domain([0, 18000]);

    const actual = shouldRoundScaleUp({yScale, maxValue: 18000, maxTicks: 5});
    expect(actual).toBe(true);
  });
});
