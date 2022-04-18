import {removeFalsyValues} from '../remove-falsy-values';

describe('removeFalsyValues()', () => {
  it('filters out nullish values', () => {
    const filtered = removeFalsyValues({
      foo: 'bar',
      number: 100,
      boolean: false,
      one: undefined,
      three: null,
    });

    expect(filtered).toStrictEqual({
      foo: 'bar',
      number: 100,
      boolean: false,
    });
  });
});
