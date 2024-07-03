import type {Theme} from '../../types';
import {getSeriesColors} from '../getSeriesColors';

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

describe('getSeriesColors', () => {
  const spy = jest.fn((_) => {});

  beforeEach(() => {
    spy.mockReset();
  });

  it('returns limited', () => {
    expect(getSeriesColors(0, SELECTED_THEME)).toStrictEqual(
      SELECTED_THEME.seriesColors.limited,
    );
    expect(getSeriesColors(2, SELECTED_THEME)).toStrictEqual(
      SELECTED_THEME.seriesColors.limited,
    );
    expect(getSeriesColors(4, SELECTED_THEME)).toStrictEqual(
      SELECTED_THEME.seriesColors.limited,
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
