import {getGradientDetails} from '../get-gradient-details';

describe('getGradientDetails', () => {
  it('returns two stop details for all positive numbers', () => {
    const actual = getGradientDetails([
      {key: '1', value: 1},
      {key: '2', value: 2},
      {key: '3', value: 3},
      {key: '4', value: 4},
      {key: '5', value: 5},
      {key: '6', value: 6},
      {key: '7', value: 7},
      {key: '8', value: 8},
      {key: '9', value: 9},
      {key: '10', value: 10},
    ]);

    expect(actual).toStrictEqual([
      {stopOpacity: 0.25, offset: 0},
      {stopOpacity: 0, offset: 100},
    ]);
  });

  it('returns two stop details for all negative numbers', () => {
    const actual = getGradientDetails([
      {key: '1', value: -1},
      {key: '2', value: -2},
      {key: '3', value: -3},
      {key: '4', value: -4},
      {key: '5', value: -5},
      {key: '6', value: -6},
      {key: '7', value: -7},
      {key: '8', value: -8},
      {key: '9', value: -9},
      {key: '10', value: -10},
    ]);

    expect(actual).toStrictEqual([
      {stopOpacity: 0, offset: 0},
      {stopOpacity: 0.25, offset: 100},
    ]);
  });

  it('returns three stop details for mixed numbers', () => {
    const actual = getGradientDetails([
      {key: '1', value: -1},
      {key: '2', value: -2},
      {key: '3', value: -3},
      {key: '4', value: -4},
      {key: '5', value: -5},
      {key: '6', value: 6},
      {key: '7', value: 7},
      {key: '8', value: 8},
      {key: '9', value: 9},
      {key: '10', value: 10},
    ]);

    expect(actual).toStrictEqual([
      {stopOpacity: 0.25, offset: 0},
      {stopOpacity: 0, offset: 66.66666666666666},
      {stopOpacity: 0.25, offset: 100},
    ]);
  });
});
