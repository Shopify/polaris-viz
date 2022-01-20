import type {StackedBarGapDirections} from 'types';

import {pushGapToArray} from '../push-gap-to-array';

const GAPS: StackedBarGapDirections = {
  negative: [],
  positive: [],
};

describe('pushGapToArray()', () => {
  it('adds a new value when direction is empty', () => {
    const gaps = JSON.parse(JSON.stringify(GAPS));

    pushGapToArray({
      gaps,
      index: 0,
      direction: 'positive',
      firstGapValue: 0,
    });

    expect(gaps).toStrictEqual({negative: [], positive: [{gap: 0, index: 0}]});
  });

  it('adds a new value when direction is not empty', () => {
    const gaps = JSON.parse(JSON.stringify(GAPS));

    pushGapToArray({
      gaps,
      index: 0,
      direction: 'positive',
      firstGapValue: 0,
    });

    pushGapToArray({
      gaps,
      index: 1,
      direction: 'positive',
      firstGapValue: 0,
    });

    expect(gaps).toStrictEqual({
      negative: [],
      positive: [
        {gap: 0, index: 0},
        {gap: 2, index: 1},
      ],
    });
  });

  it('uses provided firstGapValue', () => {
    const gaps = JSON.parse(JSON.stringify(GAPS));

    pushGapToArray({
      gaps,
      index: 0,
      direction: 'negative',
      firstGapValue: 10,
    });

    expect(gaps).toStrictEqual({
      negative: [{gap: 10, index: 0}],
      positive: [],
    });
  });
});
