describe('uniqueId', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('generates an ID with a prefix', () => {
    // can't use import syntax when restting modules
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const {uniqueId} = require('../uniqueId');

    const id = uniqueId('test');

    expect(id).toBe('test-1');
  });

  it('increments the value in the ID', () => {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const {uniqueId} = require('../uniqueId');

    uniqueId('test');
    const id = uniqueId('test');

    expect(id).toBe('test-2');
  });
});

// We export an empty module here so this file plays nice with our isolatedModules configuration
// eslint-disable-next-line jest/no-export
export {};
