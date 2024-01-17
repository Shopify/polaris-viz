import {fillMissingDataPoints} from '../fillMissingDataPoints';

describe('fillMissingDataPoints', () => {
  it('returns original data when each array length matches', () => {
    const mockData = [
      {
        name: 'Canada',
        data: [
          {key: 'Snakes', value: 122.68},
          {key: 'Dogs', value: 31.54},
        ],
      },
      {
        name: 'United States',
        data: [
          {key: 'Snakes', value: 122.68},
          {key: 'Dogs', value: 31.54},
        ],
      },
      {
        name: 'China',
        data: [
          {key: 'Snakes', value: 0},
          {key: 'Dogs', value: 0},
        ],
      },
    ];
    const result = fillMissingDataPoints(mockData);
    expect(result).toMatchObject(mockData);
  });

  it('fills data so all arrays contain all items', () => {
    const mockData = [
      {
        name: 'Canada',
        data: [
          {key: 'Mice', value: 13.28},
          {key: 'Dogs', value: 23.43},
          {key: 'Cats', value: 6.64},
          {key: 'Birds', value: 54.47},
        ],
      },
      {
        name: 'United States',
        data: [
          {key: 'Lizards', value: 350.13},
          {key: 'Turtles', value: 223.43},
          {key: 'Mice', value: 15.38},
          {key: 'Snakes', value: 122.68},
          {key: 'Dogs', value: 31.54},
          {key: 'Birds', value: 94.84},
        ],
      },
      {
        name: 'China',
        data: [
          {key: 'Snakes', value: 0},
          {key: 'Dogs', value: 0},
        ],
      },
    ];

    const result = fillMissingDataPoints(mockData);

    expect(result).toMatchObject([
      {
        name: 'Canada',
        data: [
          {key: 'Mice', value: 13.28},
          {key: 'Dogs', value: 23.43},
          {key: 'Cats', value: 6.64},
          {key: 'Birds', value: 54.47},
          {key: 'Lizards', value: null},
          {key: 'Turtles', value: null},
          {key: 'Snakes', value: null},
        ],
      },
      {
        name: 'United States',
        data: [
          {key: 'Mice', value: 15.38},
          {key: 'Dogs', value: 31.54},
          {key: 'Cats', value: null},
          {key: 'Birds', value: 94.84},
          {key: 'Lizards', value: 350.13},
          {key: 'Turtles', value: 223.43},
          {key: 'Snakes', value: 122.68},
        ],
      },
      {
        name: 'China',
        data: [
          {key: 'Mice', value: null},
          {key: 'Dogs', value: 0},
          {key: 'Cats', value: null},
          {key: 'Birds', value: null},
          {key: 'Lizards', value: null},
          {key: 'Turtles', value: null},
          {key: 'Snakes', value: 0},
        ],
      },
    ]);
  });

  it('fills data with null by default', () => {
    const mockData = [
      {
        name: 'Canada',
        data: [
          {key: 'Mice', value: 13.28},
          {key: 'Dogs', value: 23.43},
          {key: 'Cats', value: 6.64},
          {key: 'Birds', value: 54.47},
        ],
      },
      {
        name: 'China',
        data: [
          {key: 'Snakes', value: 0},
          {key: 'Dogs', value: 0},
        ],
      },
    ];

    const result = fillMissingDataPoints(mockData);

    expect(result).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              value: null,
            }),
          ]),
        }),
      ]),
    );
  });

  it('fills data with provided fill value when defined on series', () => {
    const mockData = [
      {
        name: 'Canada',
        data: [
          {key: 'Mice', value: 13.28},
          {key: 'Dogs', value: 23.43},
          {key: 'Cats', value: 6.64},
          {key: 'Birds', value: 54.47},
        ],
      },
      {
        name: 'China',
        data: [
          {key: 'Snakes', value: 10},
          {key: 'Dogs', value: 10},
        ],
        fillValue: 0,
      },
    ];

    const result = fillMissingDataPoints(mockData);

    expect(result).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              value: 0,
            }),
          ]),
        }),
      ]),
    );
  });

  it('fills data with fill value for provided series only', () => {
    const mockData = [
      {
        name: 'Canada',
        data: [
          {key: 'Mice', value: 13.28},
          {key: 'Dogs', value: 23.43},
          {key: 'Cats', value: 6.64},
          {key: 'Birds', value: 54.47},
        ],
        fillValue: null,
      },
      {
        name: 'China',
        data: [
          {key: 'Snakes', value: 10},
          {key: 'Dogs', value: 10},
        ],
        fillValue: 0,
      },
    ];

    const result = fillMissingDataPoints(mockData);

    expect(result).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              value: 0,
            }),
          ]),
        }),
      ]),
    );

    expect(result).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              value: null,
            }),
          ]),
        }),
      ]),
    );
  });

  it('fills empty series with null when no data is available', () => {
    const mockData = [
      {
        data: [
          {
            value: 357.75,
            key: '2023-10-17T00:00:00-04:00',
          },
          {
            value: 1780,
            key: '2023-10-18T00:00:00-04:00',
          },
          {
            value: 2937.813,
            key: '2023-10-19T00:00:00-04:00',
          },
          {
            value: 0,
            key: '2023-10-20T00:00:00-04:00',
          },
        ],
        name: 'Average',
      },
      {
        name: '25th percentile',
        data: [],
      },
      {
        name: 'Median',
        data: [],
      },
      {
        name: '75th percentile',
        data: [],
      },
    ];

    const result = fillMissingDataPoints(mockData);

    expect(result).toMatchObject([
      {
        data: [
          {
            value: 357.75,
            key: '2023-10-17T00:00:00-04:00',
          },
          {
            value: 1780,
            key: '2023-10-18T00:00:00-04:00',
          },
          {
            value: 2937.813,
            key: '2023-10-19T00:00:00-04:00',
          },
          {
            value: 0,
            key: '2023-10-20T00:00:00-04:00',
          },
        ],
        name: 'Average',
      },
      {
        name: '25th percentile',
        data: [
          {
            value: null,
            key: '2023-10-17T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-18T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-19T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-20T00:00:00-04:00',
          },
        ],
      },
      {
        name: 'Median',
        data: [
          {
            value: null,
            key: '2023-10-17T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-18T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-19T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-20T00:00:00-04:00',
          },
        ],
      },
      {
        name: '75th percentile',
        data: [
          {
            value: null,
            key: '2023-10-17T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-18T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-19T00:00:00-04:00',
          },
          {
            value: null,
            key: '2023-10-20T00:00:00-04:00',
          },
        ],
      },
    ]);
  });

  describe('isLinearData', () => {
    it('does not fill when isLinearData: true and series contains isComparison', () => {
      const mockData = [
        {
          name: 'Canada',
          data: [
            {key: 'Mice', value: 13.28},
            {key: 'Dogs', value: 23.43},
            {key: 'Cats', value: 6.64},
            {key: 'Birds', value: 54.47},
          ],
        },
        {
          name: 'United States',
          data: [
            {key: 'Lizards', value: 350.13},
            {key: 'Turtles', value: 223.43},
            {key: 'Mice', value: 15.38},
            {key: 'Snakes', value: 122.68},
            {key: 'Dogs', value: 31.54},
            {key: 'Birds', value: 94.84},
          ],
          isComparison: true,
        },
        {
          name: 'China',
          data: [
            {key: 'Snakes', value: 0},
            {key: 'Dogs', value: 0},
          ],
        },
      ];

      const result = fillMissingDataPoints(mockData, true);

      expect(result).toMatchObject(mockData);
    });

    it('fills all missing data when isLinearData: false', () => {
      const mockData = [
        {
          name: 'Canada',
          data: [
            {key: 'Mice', value: 13.28},
            {key: 'Dogs', value: 23.43},
            {key: 'Cats', value: 6.64},
            {key: 'Birds', value: 54.47},
          ],
        },
        {
          name: 'United States',
          data: [
            {key: 'Lizards', value: 350.13},
            {key: 'Turtles', value: 223.43},
            {key: 'Mice', value: 15.38},
            {key: 'Snakes', value: 122.68},
            {key: 'Dogs', value: 31.54},
            {key: 'Birds', value: 94.84},
          ],
          isComparison: true,
        },
        {
          name: 'China',
          data: [
            {key: 'Snakes', value: 0},
            {key: 'Dogs', value: 0},
          ],
        },
      ];

      const result = fillMissingDataPoints(mockData, false);

      expect(result).toMatchObject([
        {
          name: 'Canada',
          data: [
            {
              key: 'Mice',
              value: 13.28,
            },
            {
              key: 'Dogs',
              value: 23.43,
            },
            {
              key: 'Cats',
              value: 6.64,
            },
            {
              key: 'Birds',
              value: 54.47,
            },
            {
              key: 'Lizards',
              value: null,
            },
            {
              key: 'Turtles',
              value: null,
            },
            {
              key: 'Snakes',
              value: null,
            },
          ],
        },
        {
          name: 'United States',
          data: [
            {
              key: 'Mice',
              value: 15.38,
            },
            {
              key: 'Dogs',
              value: 31.54,
            },
            {
              key: 'Cats',
              value: null,
            },
            {
              key: 'Birds',
              value: 94.84,
            },
            {
              key: 'Lizards',
              value: 350.13,
            },
            {
              key: 'Turtles',
              value: 223.43,
            },
            {
              key: 'Snakes',
              value: 122.68,
            },
          ],
          isComparison: true,
        },
        {
          name: 'China',
          data: [
            {
              key: 'Mice',
              value: null,
            },
            {
              key: 'Dogs',
              value: 0,
            },
            {
              key: 'Cats',
              value: null,
            },
            {
              key: 'Birds',
              value: null,
            },
            {
              key: 'Lizards',
              value: null,
            },
            {
              key: 'Turtles',
              value: null,
            },
            {
              key: 'Snakes',
              value: 0,
            },
          ],
        },
      ]);
    });
  });
});
