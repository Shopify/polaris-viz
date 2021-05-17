import {getGradientDetails} from '../get-gradient-details';

describe('getGradientDetails', () => {
  it('returns two stop details for all positive numbers', () => {
    const actual = getGradientDetails([
      {label: '1', rawValue: 1},
      {label: '2', rawValue: 2},
      {label: '3', rawValue: 3},
      {label: '4', rawValue: 4},
      {label: '5', rawValue: 5},
      {label: '6', rawValue: 6},
      {label: '7', rawValue: 7},
      {label: '8', rawValue: 8},
      {label: '9', rawValue: 9},
      {label: '10', rawValue: 10},
    ]);

    expect(actual).toStrictEqual([
      {stopOpacity: 0.25, offset: 0},
      {stopOpacity: 0, offset: 100},
    ]);
  });

  it('returns two stop details for all negative numbers', () => {
    const actual = getGradientDetails([
      {label: '1', rawValue: -1},
      {label: '2', rawValue: -2},
      {label: '3', rawValue: -3},
      {label: '4', rawValue: -4},
      {label: '5', rawValue: -5},
      {label: '6', rawValue: -6},
      {label: '7', rawValue: -7},
      {label: '8', rawValue: -8},
      {label: '9', rawValue: -9},
      {label: '10', rawValue: -10},
    ]);

    expect(actual).toStrictEqual([
      {stopOpacity: 0, offset: 0},
      {stopOpacity: 0.25, offset: 100},
    ]);
  });

  it('returns three stop details for mixed numbers', () => {
    const actual = getGradientDetails([
      {label: '1', rawValue: -1},
      {label: '2', rawValue: -2},
      {label: '3', rawValue: -3},
      {label: '4', rawValue: -4},
      {label: '5', rawValue: -5},
      {label: '6', rawValue: 6},
      {label: '7', rawValue: 7},
      {label: '8', rawValue: 8},
      {label: '9', rawValue: 9},
      {label: '10', rawValue: 10},
    ]);

    expect(actual).toStrictEqual([
      {stopOpacity: 0.25, offset: 0},
      {stopOpacity: 0, offset: 66.66666666666666},
      {stopOpacity: 0.25, offset: 100},
    ]);
  });
});
