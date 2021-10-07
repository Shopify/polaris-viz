import {getBarXAxisDetails} from '../get-bar-xaxis-details';

jest.mock('../../utilities/get-text-dimensions', () => ({
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

  it('returns xAxis details when diagonal labels are needed', () => {
    const actual = getBarXAxisDetails({
      yAxisLabelWidth: 100,
      xLabels: manyDataPoints.map(({label}) => label),
      fontSize: 10,
      innerMargin: 0,
      outerMargin: 0,
      width: 100,
    });

    expect(actual).toMatchObject({needsDiagonalLabels: true});
  });

  it('returns xAxis details when horizontal labels are needed', () => {
    const fewDataPoints = [
      {rawValue: 10, label: 'Value 1'},
      {rawValue: 0, label: 'Value 2'},
    ];

    const actual = getBarXAxisDetails({
      yAxisLabelWidth: 5,
      xLabels: fewDataPoints.map(({label}) => label),
      fontSize: 10,
      innerMargin: 0,
      outerMargin: 0,
      width: 100,
    });

    expect(actual).toMatchObject({needsDiagonalLabels: false});
  });

  it('returns xAxis details when minimalLabelIndexes are provided', () => {
    const actual = getBarXAxisDetails({
      yAxisLabelWidth: 10,
      xLabels: manyDataPoints.map(({label}) => label),
      fontSize: 10,
      innerMargin: 0,
      outerMargin: 0,
      minimalLabelIndexes: [0, 4, 9],
      width: 100,
    });

    expect(actual).toMatchObject({
      maxXLabelHeight: 10.656565315951458,
      maxDiagonalLabelLength: 16.57867257451994,
      needsDiagonalLabels: true,
      maxWidth: 10.799999999999999,
    });
  });

  it('returns zeros when no xLabels are provided', () => {
    const actual = getBarXAxisDetails({
      yAxisLabelWidth: 10,
      xLabels: [],
      fontSize: 10,
      innerMargin: 0,
      outerMargin: 0,
      minimalLabelIndexes: null,
      width: 100,
    });

    expect(actual).toMatchObject({
      maxXLabelHeight: 0,
      maxDiagonalLabelLength: 0,
      needsDiagonalLabels: false,
      maxWidth: 0,
    });
  });
});
