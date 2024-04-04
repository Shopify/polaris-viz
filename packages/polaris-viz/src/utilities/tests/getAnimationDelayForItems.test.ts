import {getAnimationDelayForItems} from '../getAnimationDelayForItems';

describe('getAnimationDelayForItems()', () => {
  it.each([
    {count: 1, expected: 100},
    {count: 10, expected: 100},
    {count: 50, expected: 20},
    {count: 100, expected: 10},
    {count: 250, expected: 4},
    {count: 1000, expected: 1},
  ])('generates a delay for $count items', ({count, expected}) => {
    expect(getAnimationDelayForItems(count)).toBe(expected);
  });
});
