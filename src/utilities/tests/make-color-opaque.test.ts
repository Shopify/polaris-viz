import {color} from 'd3-color';

import {makeColorOpaque, makeGradientOpaque} from '../make-color-opaque';

jest.mock('d3-color', () => ({
  color: jest.fn(() => null),
}));

describe('makeColorOpaque', () => {
  it('throws an error if d3Color returns null', () => {
    expect(() => {
      makeColorOpaque('rgb(255, 255, 255)');
    }).toThrow('Color value is not valid.');
  });
});

describe('makeGradientOpaque', () => {
  it('returns the gradient with opaque colours', () => {
    (color as jest.Mock).mockImplementation(
      jest.requireActual('d3-color').color,
    );

    const gradient = makeGradientOpaque([
      {color: 'rgba(255, 0, 0, 0.5)', offset: 1},
      {color: 'rgba(123, 123, 123, 0.5)', offset: 2},
    ]);

    expect(gradient).toStrictEqual([
      {color: 'rgb(255, 0, 0)', offset: 1},
      {color: 'rgb(123, 123, 123)', offset: 2},
    ]);
  });
});
