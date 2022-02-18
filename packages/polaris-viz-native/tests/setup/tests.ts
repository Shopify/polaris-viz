import '@quilted/react-testing/matchers';
import {unmountAll} from '@quilted/react-testing';

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  unmountAll();
  jest.clearAllMocks();
});
