import {uniqueId} from '../unique-id';

describe('uniqueId', () => {
  it('generates an ID with a prefix', () => {
    const id = uniqueId('test');
    expect(id).toBe('test-1');
  });

  it('increments the value in the ID', () => {
    const id = uniqueId('test');
    expect(id).toBe('test-2');
  });
});
