import {getXAxisDetails} from '../get-xaxis-details';

jest.mock('../../../../utilities', () => ({
  ...jest.requireActual('../../../../utilities'),
  getTextWidth: jest.fn(() => 20),
  getTextContainerHeight: jest.fn(() => 30),
}));

describe('getXAxisDetails', () => {
  it('returns xAxis details when diagonal labels are needed', () => {
    const manyDataPoints = [
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
    ];

    const actual = getXAxisDetails({
      data: manyDataPoints,
      fontSize: 10,
      formatYAxisLabel: (val) => val.toString(),
      formatXAxisLabel: (val) => val,
      chartDimensions: {
        height: 100,
        width: 100,
      } as any,
    });

    expect(actual).toStrictEqual({
      maxDiagonalLabelLength: 39.94546305356773,
      maxXLabelHeight: 25.676448714024772,
      needsDiagonalLabels: true,
    });
  });

  it('returns xAxis details when horizontal labels are needed', () => {
    const fewDataPoints = [
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
    ];

    const actual = getXAxisDetails({
      data: fewDataPoints,
      fontSize: 10,
      formatYAxisLabel: (val) => val.toString(),
      formatXAxisLabel: (val) => val,
      chartDimensions: {
        height: 100,
        width: 100,
      } as any,
    });

    expect(actual).toStrictEqual({
      maxDiagonalLabelLength: 40,
      maxXLabelHeight: 30,
      needsDiagonalLabels: false,
    });
  });
});
