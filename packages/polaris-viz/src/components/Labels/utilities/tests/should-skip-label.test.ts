import {shouldSkipLabel} from '../should-skip-label';

describe('shouldSkipLabel()', () => {
  it('returns false when indexes match', () => {
    expect(shouldSkipLabel(2, [0, 2, 4])).toStrictEqual(false);
  });

  it('returns true when indexes do not match', () => {
    expect(shouldSkipLabel(2, [0, 4])).toStrictEqual(true);
  });

  it('returns false when array is empty', () => {
    expect(shouldSkipLabel(2, [])).toStrictEqual(false);
  });

  it('returns false when array is not provided', () => {
    expect(shouldSkipLabel(2)).toStrictEqual(false);
  });
});
