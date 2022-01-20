import {clamp} from '../clamp';

describe('clamp', () => {
  it('returns the amount when it is between the min and max', () => {
    const actual = clamp({amount: 101, min: 10, max: 200});
    expect(actual).toBe(101);
  });

  it('returns the the min when it is greater than the amount', () => {
    const actual = clamp({amount: -101, min: 10, max: 200});
    expect(actual).toBe(10);
  });

  it('returns the the max when it is less than the amount', () => {
    const actual = clamp({amount: 1010, min: 10, max: 200});
    expect(actual).toBe(200);
  });
});
