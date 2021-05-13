import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';

Object.defineProperty(window, 'ResizeObserver', {
  value: jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

describe('setup', () => {
  afterEach(() => {
    destroyAll();
  });
});
