import {DEFAULT_MAX_Y} from '../../constants';
import type {DataSeries, StackedSeries} from '../../types';
import {getStackedMinMax} from '../get-stacked-min-max';

const mockData: DataSeries[] = [
  {
    data: [
      {key: 'label', value: 10},
      {key: 'label', value: 20},
      {key: 'label', value: 30},
    ],
    color: 'black',
    name: 'LABEL1',
  },
  {
    data: [
      {key: 'label', value: 1},
      {key: 'label', value: 2},
      {key: 'label', value: 3},
    ],
    color: 'black',
    name: 'LABEL2',
  },
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
] as StackedSeries[];

const mockZeroData: DataSeries[] = [
  {
    data: [
      {key: 'label', value: 0},
      {key: 'label', value: 0},
      {key: 'label', value: 0},
    ],
    color: 'black',
    name: 'LABEL1',
  },
  {
    data: [
      {key: 'label', value: 0},
      {key: 'label', value: 0},
      {key: 'label', value: 0},
    ],
    color: 'black',
    name: 'LABEL2',
  },
];
const mockZeroStackedData = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
  ],
] as StackedSeries[];

const mockNegativeStackedData = [
  [
    [-3, 0],
    [-7, 0],
  ],
  [
    [-7, -3],
    [-10, -7],
  ],
  [
    [-14, -7],
    [-12, -10],
  ],
] as StackedSeries[];

const mockNegativeSeries: DataSeries[] = [
  {
    color: 'purple',
    name: 'Breakfast',
    data: [
      {
        key: 'Monday',
        value: -3,
      },
      {
        key: 'Tuesday',
        value: -7,
      },
    ],
  },
  {
    color: 'red',
    name: 'Lunch',
    data: [
      {
        key: 'Monday',
        value: -4,
      },
      {
        key: 'Tuesday',
        value: -3,
      },
    ],
  },
];

const mockProps = {
  stackedValues: mockStackedData,
  data: mockData,
  integersOnly: false,
};

describe('get-min-max', () => {
  it('returns min and max of non stacked data when stackedValues is null', () => {
    const {min, max} = getStackedMinMax({...mockProps, stackedValues: null});

    expect(min).toStrictEqual(0);
    expect(max).toStrictEqual(30);
  });

  it('returns min and max of stacked values when stackedValues is not null', () => {
    const {min, max} = getStackedMinMax(mockProps);

    expect(min).toStrictEqual(0);
    expect(max).toStrictEqual(33);
  });

  it('returns the default max y value for non stacked values of all zeros', () => {
    const {max} = getStackedMinMax({
      ...mockProps,
      stackedValues: null,
      data: mockZeroData,
    });

    expect(max).toStrictEqual(DEFAULT_MAX_Y);
  });

  it('returns the default max y value for stacked values of all zeros', () => {
    const {max} = getStackedMinMax({
      ...mockProps,
      stackedValues: mockZeroStackedData,
      data: mockZeroData,
    });
    expect(max).toStrictEqual(DEFAULT_MAX_Y);
  });

  it('returns 0 as the max when all stacked values are negative', () => {
    const {max} = getStackedMinMax({
      ...mockProps,
      stackedValues: mockNegativeStackedData,
      data: mockNegativeSeries,
    });
    expect(max).toStrictEqual(0);
  });

  it('returns 0 as the max when all non-stacked values are negative', () => {
    const {max} = getStackedMinMax({
      ...mockProps,
      stackedValues: null,
      data: mockNegativeSeries,
    });
    expect(max).toStrictEqual(0);
  });

  describe('integersOnly', () => {
    it('returns a rounded down min and rounded up max if true', () => {
      const minMax = getStackedMinMax({
        stackedValues: null,
        data: [
          {
            data: [
              {key: 'label', value: 0.2},
              {key: 'label', value: 0.8},
            ],
            color: 'black',
            name: 'LABEL1',
          },
          {
            data: [
              {key: 'label', value: 0.3},
              {key: 'label', value: 0.9},
            ],
            color: 'black',
            name: 'LABEL2',
          },
        ],
        integersOnly: true,
      });

      expect(minMax).toStrictEqual({min: 0, max: 1});
    });
  });
});
