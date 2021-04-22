import {isGradientType} from '../is-gradient-type';

describe('isGradientType', () => {
  it('returns false for non gradient types', () => {
    const isGradient = isGradientType('primary');

    expect(isGradient).toBe(false);
  });

  it('returns true for gradient types', () => {
    const isGradient = isGradientType([{color: '#fff', offset: 0}]);

    expect(isGradient).toBe(true);
  });
});
