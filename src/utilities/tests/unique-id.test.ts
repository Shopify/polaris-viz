describe('uniqueId', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('generates an ID with a prefix', () => {
    // can't use import syntax when restting modules
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const {uniqueId} = require('../unique-id');

    const id = uniqueId('test');

    expect(id).toBe('test-1');
  });

  it('increments the value in the ID', () => {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const {uniqueId} = require('../unique-id');

    uniqueId('test');
    const id = uniqueId('test');

    expect(id).toBe('test-2');
  });
});
