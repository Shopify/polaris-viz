import {color} from 'd3-color';

import {changeColorOpacity, changeGradientOpacity} from '../changeColorOpacity';

jest.mock('d3-color', () => ({
  color: jest.fn(() => null),
}));

describe('changeColorOpacity', () => {
  it('throws an error if d3Color returns null', () => {
    expect(() => {
      changeColorOpacity('rgb(255, 255, 255)');
    }).toThrow('Color value is not valid.');
  });

  it('correctly changes a colors opacity', () => {
    (color as jest.Mock).mockImplementation(
      jest.requireActual('d3-color').color,
    );

    expect(changeColorOpacity('#ffffff', 0.5)).toStrictEqual(
      'rgba(255, 255, 255, 0.5)',
    );
  });
});

describe('changeGradientOpacity', () => {
  it('returns the gradient with opaque colours', () => {
    (color as jest.Mock).mockImplementation(
      jest.requireActual('d3-color').color,
    );

    const gradient = changeGradientOpacity([
      {color: 'rgba(255, 0, 0, 0.5)', offset: 1},
      {color: 'rgba(123, 123, 123, 0.5)', offset: 2},
    ]);

    expect(gradient).toStrictEqual([
      {color: 'rgb(255, 0, 0)', offset: 1},
      {color: 'rgb(123, 123, 123)', offset: 2},
    ]);
  });

  it('returns the gradient with changed opacity on all colours', () => {
    (color as jest.Mock).mockImplementation(
      jest.requireActual('d3-color').color,
    );

    const gradient = changeGradientOpacity(
      [
        {color: 'rgb(255, 0, 0)', offset: 1},
        {color: 'rgb(123, 123, 123)', offset: 2},
      ],
      0.5,
    );

    expect(gradient).toStrictEqual([
      {color: 'rgba(255, 0, 0, 0.5)', offset: 1},
      {color: 'rgba(123, 123, 123, 0.5)', offset: 2},
    ]);
  });
});
