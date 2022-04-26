import {borderRadiusStringToObject} from '../';

describe('borderRadiusStringToObject()', () => {
  const result1 = {
    topLeft: 20,
    topRight: 20,
    bottomRight: 20,
    bottomLeft: 20,
  };

  const result2 = {
    topLeft: 20,
    topRight: 0,
    bottomRight: 20,
    bottomLeft: 0,
  };

  const result3 = {
    topLeft: 20,
    topRight: 10,
    bottomRight: 5,
    bottomLeft: 10,
  };

  const result4 = {
    topLeft: 0,
    topRight: 20,
    bottomRight: 10,
    bottomLeft: 5,
  };
  const result5 = {
    topLeft: 0,
    topRight: 20,
    bottomRight: 100,
    bottomLeft: 5,
  };

  it.each`
    borderRadiusString   | expected
    ${'20px'}            | ${result1}
    ${'20px 0'}          | ${result2}
    ${'20px 10px 5px'}   | ${result3}
    ${'0 20px 10px 5px'} | ${result4}
    ${'0 20em 100% 5px'} | ${result5}
  `(
    'converts shorthand CSS border-radius string to JS object with pixel numbers',
    ({borderRadiusString, expected}) => {
      const actual = borderRadiusStringToObject(borderRadiusString);

      expect(actual).toStrictEqual(expected);
    },
  );
});
