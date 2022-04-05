import {filterObject} from '../filter-object';

describe('filterObject()', () => {
  it('filters out nullish values', () => {
    const filtered = filterObject({
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
