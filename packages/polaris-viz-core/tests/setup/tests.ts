import {destroyAll} from '@shopify/react-testing';

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});
