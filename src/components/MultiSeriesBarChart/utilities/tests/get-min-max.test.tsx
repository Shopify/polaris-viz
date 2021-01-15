import {Data, StackSeries} from 'components/MultiSeriesBarChart/types';

import {getMinMax} from '../get-min-max';

const mockData: Data[] = [
  {data: [10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
  {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL2'},
];
const mockStackedData = [
  [
    [0, 10],
    [0, 20],
    [0, 30],
  ],
  [
    [10, 11],
    [20, 22],
    [30, 33],
  ],
] as StackSeries[];

describe('get-min-max', () => {
  it('returns min and max of non stacked data when stackedValues is null', () => {
    const {min, max} = getMinMax(null, mockData);

    expect(min).toStrictEqual(0);
    expect(max).toStrictEqual(30);
  });

  it('returns min and max of stacked values when stackedValues is not null', () => {
    const {min, max} = getMinMax(mockStackedData, mockData);

    expect(min).toStrictEqual(0);
    expect(max).toStrictEqual(33);
  });

  it('rounds the min and max to the closest integer', () => {
    const {min, max} = getMinMax(null, [
      {data: [-0.5, -0.1, 0], color: 'colorBlack', label: 'LABEL1'},
      {data: [0, 0.2, 0.3], color: 'colorBlack', label: 'LABEL2'},
    ]);

    expect(min).toStrictEqual(-1);
    expect(max).toStrictEqual(1);
  });
});
