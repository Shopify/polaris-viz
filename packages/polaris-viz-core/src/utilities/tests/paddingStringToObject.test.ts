import {paddingStringToObject} from '../';

describe('paddingStringToObject()', () => {
  const result1 = {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  };

  const result2 = {
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 0,
  };

  const result3 = {
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  };

  const result4 = {
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 5,
  };
  const result5 = {
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 100,
    paddingLeft: 5,
  };

  it.each`
    paddingString        | expected
    ${'20px'}            | ${result1}
    ${'20px 0'}          | ${result2}
    ${'20px 10px 5px'}   | ${result3}
    ${'0 20px 10px 5px'} | ${result4}
    ${'0 20em 100% 5px'} | ${result5}
  `(
    'converts shorthand CSS padding string to JS object with pixel numbers',
    ({paddingString, expected}) => {
      const actual = paddingStringToObject(paddingString);

      expect(actual).toStrictEqual(expected);
    },
  );
});
