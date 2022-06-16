import {createCSSConicGradient} from '../createCssConicGradient';

const GRADIENT_STOP = [
  {color: 'lime', offset: 0},
  {color: 'magenta', offset: 1},
];

const CONIC_GRADIENT = 'conic-gradient(lime 0%, magenta 1%)';

describe('createCssConicGradient', () => {
  it('returns a conic gradient string with given values', () => {
    const conicGradient = createCSSConicGradient(GRADIENT_STOP);

    expect(conicGradient).toBe(CONIC_GRADIENT);
  });
});
