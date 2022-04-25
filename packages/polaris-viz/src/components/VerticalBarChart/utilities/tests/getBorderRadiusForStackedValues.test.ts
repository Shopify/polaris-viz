/* eslint-disable jest/expect-expect */
import {BORDER_RADIUS} from '@shopify/polaris-viz-core';
import {BorderRadius} from '@shopify/polaris-viz-core/build/ts/types';

import {getBorderRadiusForStackedValues} from '../getBorderRadiusForStackedValues';

describe('getBorderRadiusForStackedValues()', () => {
  function runAssertion(stackedValues: number[], cases: string[]) {
    cases.forEach((expected, index) => {
      const roundedBorder = getBorderRadiusForStackedValues(
        stackedValues,
        index,
      );

      expect(roundedBorder).toStrictEqual(expected);
    });
  }

  it('returns borders for all positive values', () => {
    runAssertion(
      [5, 10, 15],
      [BORDER_RADIUS.None, BORDER_RADIUS.None, BORDER_RADIUS.Top],
    );
  });

  it('returns borders for all negative values', () => {
    runAssertion(
      [-5, -10, -15],
      [BORDER_RADIUS.None, BORDER_RADIUS.None, BORDER_RADIUS.Bottom],
    );
  });

  it('returns borders for non-sequential mixed values', () => {
    runAssertion(
      [10, -15, -5, 5],
      [
        BORDER_RADIUS.None,
        BORDER_RADIUS.None,
        BORDER_RADIUS.Bottom,
        BORDER_RADIUS.Top,
      ],
    );
  });

  it('returns borders for matching positive values', () => {
    runAssertion(
      [50, 8, 50],
      [BORDER_RADIUS.None, BORDER_RADIUS.None, BORDER_RADIUS.Top],
    );
  });

  it('returns borders for matching negative values', () => {
    runAssertion(
      [-50, -8, -50],
      [BORDER_RADIUS.None, BORDER_RADIUS.None, BORDER_RADIUS.Bottom],
    );
  });

  it('returns borders for mixed positive & negative values', () => {
    runAssertion(
      [-5, 10, 15],
      [BORDER_RADIUS.Bottom, BORDER_RADIUS.None, BORDER_RADIUS.Top],
    );

    runAssertion(
      [-5, -10, 15],
      [BORDER_RADIUS.None, BORDER_RADIUS.Bottom, BORDER_RADIUS.Top],
    );

    runAssertion(
      [5, -10, 15],
      [BORDER_RADIUS.None, BORDER_RADIUS.Bottom, BORDER_RADIUS.Top],
    );

    runAssertion(
      [5, -10, -15],
      [BORDER_RADIUS.Top, BORDER_RADIUS.None, BORDER_RADIUS.Bottom],
    );

    runAssertion(
      [-5, 10, -15],
      [BORDER_RADIUS.None, BORDER_RADIUS.Top, BORDER_RADIUS.Bottom],
    );
  });

  it('returns borders for positive, mostly 0 values', () => {
    runAssertion(
      [7, 0, 0],
      [BORDER_RADIUS.Top, BORDER_RADIUS.None, BORDER_RADIUS.None],
    );

    runAssertion(
      [0, 7, 0],
      [BORDER_RADIUS.None, BORDER_RADIUS.Top, BORDER_RADIUS.None],
    );

    runAssertion(
      [0, 0, 7],
      [BORDER_RADIUS.None, BORDER_RADIUS.None, BORDER_RADIUS.Top],
    );
  });

  it('returns borders for negative, mostly 0 values', () => {
    runAssertion(
      [-7, 0, 0],
      [BORDER_RADIUS.Bottom, BORDER_RADIUS.None, BORDER_RADIUS.None],
    );

    runAssertion(
      [0, -7, 0],
      [BORDER_RADIUS.None, BORDER_RADIUS.Bottom, BORDER_RADIUS.None],
    );

    runAssertion(
      [0, 0, -7],
      [BORDER_RADIUS.None, BORDER_RADIUS.None, BORDER_RADIUS.Bottom],
    );
  });
});
