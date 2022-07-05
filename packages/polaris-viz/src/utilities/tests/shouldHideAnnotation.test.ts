import {shouldHideAnnotation} from '../shouldHideAnnotation';

describe('shouldHideAnnotation()', () => {
  it('bails early when isShowingAllAnnotations is true', () => {
    expect(
      shouldHideAnnotation({
        row: 4,
        rowCount: 7,
        isShowingAllAnnotations: true,
      }),
    ).toStrictEqual(false);
  });

  it('returns false if rowCount === 3', () => {
    expect(
      shouldHideAnnotation({
        row: 1,
        rowCount: 3,
        isShowingAllAnnotations: false,
      }),
    ).toStrictEqual(false);
  });

  it.each([
    {row: 1, rowCount: 1, expected: false},
    {row: 1, rowCount: 2, expected: false},
    {row: 3, rowCount: 4, expected: true},
    {row: 5, rowCount: 5, expected: true},
    {row: 8, rowCount: 5, expected: true},
  ])(
    'returns $expected when row: $row and $rowCount rows',
    ({row, rowCount, expected}) => {
      expect(
        shouldHideAnnotation({
          row,
          rowCount,
          isShowingAllAnnotations: false,
        }),
      ).toStrictEqual(expected);
    },
  );
});
