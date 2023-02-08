import {mount} from '@shopify/react-testing';

import type {Theme} from '../../types';
import {getSeriesColors} from '../../utilities';
import {useThemeSeriesColors} from '../useThemeSeriesColors';

const SELECTED_THEME = {
  seriesColors: {
    upToFour: ['#9479F7', '#578FE1', '#CF68C1', '#5B97AD'],
    fromFiveToSeven: [
      '#5B97AD',
      '#578FE1',
      '#9479F7',
      '#C29FED',
      '#CF68C1',
      '#D7905B',
      '#F4CE74',
    ],
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

  describe('getSeriesColors', () => {
    it('returns upToFour', () => {
      expect(getSeriesColors(0, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.upToFour,
      );
      expect(getSeriesColors(2, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.upToFour,
      );
      expect(getSeriesColors(4, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.upToFour,
      );
    });

    it('returns fromFiveToSeven', () => {
      expect(getSeriesColors(5, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.fromFiveToSeven,
      );
      expect(getSeriesColors(6, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.fromFiveToSeven,
      );
      expect(getSeriesColors(7, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.fromFiveToSeven,
      );
    });

    it('returns all', () => {
      expect(getSeriesColors(8, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.all,
      );
      expect(getSeriesColors(14, SELECTED_THEME)).toStrictEqual(
        SELECTED_THEME.seriesColors.all,
      );
    });

    it('loops colors when count is larger than all colors', () => {
      expect(getSeriesColors(20, SELECTED_THEME)).toStrictEqual([
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
        '#41778B',
        '#8DAEEF',
        '#7847F4',
        '#AA77DE',
        '#A74E9B',
        '#E4A175',
      ]);
    });
  });
});
