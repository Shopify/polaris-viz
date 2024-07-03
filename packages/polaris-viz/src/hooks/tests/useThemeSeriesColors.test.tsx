import {mount} from '@shopify/react-testing';

import type {Theme} from '../../types';
import {useThemeSeriesColors, getSeriesColors} from '../useThemeSeriesColors';

const SELECTED_THEME = {
  seriesColors: {
    limited: ['#9479F7', '#578FE1', '#CF68C1', '#5B97AD'],
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
} as Theme;

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
              data: [{label: 'January', rawValue: 4237}],
            },
            {
              name: 'Returning',
              data: [{label: 'January', rawValue: 5663}],
            },
          ],
          SELECTED_THEME as Theme,
        );
        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith(['#9479F7', '#578FE1']);
    });

    it('builds a simple array with overrides', () => {
      function MockComponent() {
        const colors = useThemeSeriesColors(
          [
            {
              name: 'First-time',
              data: [{label: 'January', rawValue: 4237}],
            },
            {
              name: 'Returning',
              data: [{label: 'January', rawValue: 5663}],
              color: '#ff1111',
            },
          ],
          SELECTED_THEME,
        );
        spy(colors);
        return null;
      }

      mount(<MockComponent />);

      expect(spy).toHaveBeenCalledWith(['#9479F7', '#ff1111']);
    });

    it('builds big array with no overrides', () => {
      const series = Array(10)
        .fill(null)
        .map((index) => {
          return {
            name: index,
            data: [{label: 'January', rawValue: 4237}],
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
            data: [{label: 'January', rawValue: 4237}],
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
  });
});
