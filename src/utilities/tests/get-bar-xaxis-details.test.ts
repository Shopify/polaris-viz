import {getBarXAxisDetails} from '../get-bar-xaxis-details';

jest.mock('../../utilities/get-text-width', () => ({
  getTextWidth: jest.fn(() => 20),
}));

jest.mock('../../utilities/get-text-container-height', () => ({
  getTextContainerHeight: jest.fn(() => 30),
  getLongestLabelDetails: jest.fn(() => {
    return {label: '', length: 20};
  }),
  getMaxDiagonalDetails: jest.fn(() => {
    return {angledLabelMaxLength: 20, maxDiagonalLabelHeight: 25.6};
  }),
}));

describe('getBarXAxisDetails', () => {
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

    const actual = getBarXAxisDetails({
      yAxisLabelWidth: 100,
      xLabels: manyDataPoints.map(({label}) => label),
      fontSize: 10,
      chartDimensions: {
        height: 100,
        width: 100,
      } as any,
    });

    expect(actual).toMatchObject({needsDiagonalLabels: true});
  });

  it('returns xAxis details when horizontal labels are needed', () => {
    const fewDataPoints = [
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
    ];

    const actual = getBarXAxisDetails({
      yAxisLabelWidth: 10,
      xLabels: fewDataPoints.map(({label}) => label),
      fontSize: 10,
      chartDimensions: {
        height: 100,
        width: 100,
      } as any,
    });

    expect(actual).toMatchObject({needsDiagonalLabels: false});
  });
});
