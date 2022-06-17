import {createCSSConicGradient} from '../createCssConicGradient';

const gradientStop1 = [
  {color: 'lime', offset: 0},
  {color: 'magenta', offset: 1},
];

const gradientStop2 = [
  {color: 'red', offset: 50},
  {color: 'green', offset: 75},
];
const gradientStop3 = [
  {color: 'purple', offset: 12},
  {color: 'orange', offset: 12},
];
const gradientStop4 = [
  {color: 'black', offset: 0},
  {color: 'white', offset: 166},
];

const result1 = 'conic-gradient(lime 0%, magenta 1%)';
const result2 = 'conic-gradient(red 50%, green 75%)';
const result3 = 'conic-gradient(purple 12%, orange 12%)';
const result4 = 'conic-gradient(black 0%, white 166%)';

describe('createCssConicGradient', () => {
  it.each([
    {
      gradientStop: gradientStop1,
      expected: result1,
    },
    {
      gradientStop: gradientStop2,
      expected: result2,
    },
    {
      gradientStop: gradientStop3,
      expected: result3,
    },
    {
      gradientStop: gradientStop4,
      expected: result4,
    },
  ])(
    'creates a conic-gradient string with the given gradientStop',
    ({gradientStop, expected}) => {
      const conicGradient = createCSSConicGradient(gradientStop);

      expect(conicGradient).toStrictEqual(expected);
    },
  );
});
