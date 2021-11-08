/* eslint-disable jest/expect-expect */

import {RoundedBorder} from '../../../../types';
import {getRoundedBorderForStackedValues} from '../get-rounded-border-for-stacked-values';

describe('getRoundedBorderForStackedValues()', () => {
  function runAssertion(stackedValues: number[], cases: RoundedBorder[]) {
    cases.forEach((expected, index) => {
      const roundedBorder = getRoundedBorderForStackedValues(
        stackedValues,
        index,
      );

      expect(roundedBorder).toStrictEqual(expected);
    });
  }

  it('returns borders for all positive values', () => {
    runAssertion(
      [5, 10, 15],
      [RoundedBorder.None, RoundedBorder.None, RoundedBorder.Top],
    );
  });

  it('returns borders for all negative values', () => {
    runAssertion(
      [-5, -10, -15],
      [RoundedBorder.None, RoundedBorder.None, RoundedBorder.Bottom],
    );
  });

  it('returns borders for non-sequential mixed values', () => {
    runAssertion(
      [10, -15, -5, 5],
      [
        RoundedBorder.None,
        RoundedBorder.None,
        RoundedBorder.Bottom,
        RoundedBorder.Top,
      ],
    );
  });

  it('returns borders for matching positive values', () => {
    runAssertion(
      [50, 8, 50],
      [RoundedBorder.None, RoundedBorder.None, RoundedBorder.Top],
    );
  });

  it('returns borders for matching negative values', () => {
    runAssertion(
      [-50, -8, -50],
      [RoundedBorder.None, RoundedBorder.None, RoundedBorder.Bottom],
    );
  });

  it('returns borders for mixed positive & negative values', () => {
    runAssertion(
      [-5, 10, 15],
      [RoundedBorder.Bottom, RoundedBorder.None, RoundedBorder.Top],
    );

    runAssertion(
      [-5, -10, 15],
      [RoundedBorder.None, RoundedBorder.Bottom, RoundedBorder.Top],
    );

    runAssertion(
      [5, -10, 15],
      [RoundedBorder.None, RoundedBorder.Bottom, RoundedBorder.Top],
    );

    runAssertion(
      [5, -10, -15],
      [RoundedBorder.Top, RoundedBorder.None, RoundedBorder.Bottom],
    );

    runAssertion(
      [-5, 10, -15],
      [RoundedBorder.None, RoundedBorder.Top, RoundedBorder.Bottom],
    );
  });

  it('returns borders for positive, mostly 0 values', () => {
    runAssertion(
      [7, 0, 0],
      [RoundedBorder.Top, RoundedBorder.None, RoundedBorder.None],
    );

    runAssertion(
      [0, 7, 0],
      [RoundedBorder.None, RoundedBorder.Top, RoundedBorder.None],
    );

    runAssertion(
      [0, 0, 7],
      [RoundedBorder.None, RoundedBorder.None, RoundedBorder.Top],
    );
  });

  it('returns borders for negative, mostly 0 values', () => {
    runAssertion(
      [-7, 0, 0],
      [RoundedBorder.Bottom, RoundedBorder.None, RoundedBorder.None],
    );

    runAssertion(
      [0, -7, 0],
      [RoundedBorder.None, RoundedBorder.Bottom, RoundedBorder.None],
    );

    runAssertion(
      [0, 0, -7],
      [RoundedBorder.None, RoundedBorder.None, RoundedBorder.Bottom],
    );
  });
});
