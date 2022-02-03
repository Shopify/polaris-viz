import '@shopify/react-testing/matchers';

import {destroyAll} from '@shopify/react-testing';
import {Globals} from '@react-spring/web';

console.log('hello from tests 👋🏻');

jest.mock('../../src/constants.ts', () => {
  const actual = jest.requireActual('../../src/constants.ts');

  return {
    ...actual,
    SPACING_EXTRA_TIGHT: 4,
    SPACING_TIGHT: 8,
    SPACING_BASE_TIGHT: 12,
    SPACING: 16,
    LineChartMargin: {
      Top: 8,
      Left: 0,
      Bottom: 24,
      Right: 4,
    },
    BarChartMargin: {
      Top: 5,
      Left: 0,
      Bottom: 24,
      Right: 20,
    },
    MASK_HIGHLIGHT_COLOR: 'rgb(255, 255, 255)',
    colorPurpleDark: 'rgb(80, 36, 143)',
  };
});

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

Object.defineProperty(window, 'ResizeObserver', {
  value: jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

Globals.assign({
  skipAnimation: true,
});

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});
