import {isValueWithinDomain} from '../isValueWithinDomain';

describe('isValueWithinDomain()', () => {
  it.each([
    {
      value: 5,
      domain: [],
      expected: false,
    },
    {
      value: 2,
      domain: [5],
      expected: false,
    },
    {
      value: 5,
      domain: [5],
      expected: true,
    },
    {
      value: 5,
      domain: [0, 10],
      expected: true,
    },
    {
      value: 5,
      domain: [10, 0],
      expected: true,
    },
    {
      value: 5,
      domain: [1, 8, 10, 9, -10],
      expected: true,
    },
    {
      value: -5,
      domain: [-10, 0],
      expected: true,
    },
  ])(
    'returns $expected when value: $value, domain: $domain',
    ({value, domain, expected}) => {
      expect(isValueWithinDomain(value, domain)).toStrictEqual(expected);
    },
  );
});
