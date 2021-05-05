import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import {Globals} from '@react-spring/web';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Globals.assign({
  skipAnimation: true,
});

describe('setup', () => {
  afterEach(() => {
    destroyAll();
  });
});
