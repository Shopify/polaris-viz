import {mount} from '@shopify/react-testing';

import type {Theme} from '../../types';
import {useThemeSeriesColors} from '../useThemeSeriesColors';

const SELECTED_THEME = {
  seriesColors: {
    all: [
      '#41778B',
      '#8DAEEF',
      '#7847F4',
      '#AA77DE',
      '#A74E9B',
      '#E4A175',
      '#BE9D44',
      '#87C9E3',
      '#4D7FC9',
      '#C3B6FB',
      '#9643D7',
      '#CF68C1',
      '#AD7349',
      '#F4CE74',
    ],
  },
} as unknown as Theme;

describe('useThemeSeriesColors', () => {
  const spy = jest.fn((_) => {});

  beforeEach(() => {
    spy.mockReset();
  });

  describe('useThemeSeriesColors', () => {
    it('builds a simple array with no overrides', () => {
      function MockComponent() {
        const colors = useThemeSeriesColors(
          [
            {
              name: 'First-time',
              data: [{key: 'January', value: 4237}],
            },
            {
              name: 'Returning',
              data: [{key: 'January', value: 5663}],
            },
          ],
          SELECTED_THEME,
        );

        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith(['#41778B', '#8DAEEF']);
    });

    it('builds a simple array with overrides', () => {
      function MockComponent() {
        const colors = useThemeSeriesColors(
          [
            {
              name: 'First-time',
              data: [{key: 'January', value: 4237}],
            },
            {
              name: 'Returning',
              data: [{key: 'January', value: 5663}],
              color: '#ff1111',
            },
          ],
          SELECTED_THEME,
        );
        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith(['#41778B', '#ff1111']);
    });

    it('builds big array with no overrides', () => {
      const series = Array(10)
        .fill(null)
        .map((index) => {
          return {
            name: index,
            data: [{key: 'January', value: 4237}],
          };
        });

      function MockComponent() {
        const colors = useThemeSeriesColors(series, SELECTED_THEME);
        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith([
        '#41778B',
        '#8DAEEF',
        '#7847F4',
        '#AA77DE',
        '#A74E9B',
        '#E4A175',
        '#BE9D44',
        '#87C9E3',
        '#4D7FC9',
        '#C3B6FB',
      ]);
    });

    it('builds big array with overrides', () => {
      const series = Array(10)
        .fill(null)
        .map((_, index) => {
          return {
            name: `${index}`,
            data: [{key: 'January', value: 4237}],
            color: index === 5 ? '#ff1111' : undefined,
          };
        });

      function MockComponent() {
        const colors = useThemeSeriesColors(series, SELECTED_THEME);
        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith([
        '#41778B',
        '#8DAEEF',
        '#7847F4',
        '#AA77DE',
        '#A74E9B',
        '#ff1111',
        '#E4A175',
        '#BE9D44',
        '#87C9E3',
        '#4D7FC9',
      ]);
    });

    it('replaces comparison series with the color of the matching non-comparison series', () => {
      const mockSeries = [
        {
          name: 'One',
          color: 'red',
          data: [{key: 'January', value: 4237}],
          metadata: {
            comparisonIndex: 1,
          },
        },
        {
          name: 'One Comparison',
          data: [{key: 'January', value: 5663}],
          isComparison: true,
        },
        {
          name: 'Two',
          color: 'blue',
          data: [{key: 'January', value: 5663}],
          metadata: {
            comparisonIndex: 3,
          },
        },
        {
          name: 'Two Comparison',
          data: [{key: 'January', value: 5663}],
          isComparison: true,
        },
      ];

      function MockComponent() {
        const colors = useThemeSeriesColors(mockSeries, SELECTED_THEME);
        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith(['red', 'red', 'blue', 'blue']);
    });
  });
});
