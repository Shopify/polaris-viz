import '@shopify/react-testing/matchers';
import {destroyAll} from '@shopify/react-testing';
import {cloneElement} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Globals} from '@react-spring/web';

const mockCloneElement = (element: React.ReactElement, props) =>
  cloneElement(element, props);

jest.mock('../../packages/polaris-viz/src/components/ChartContainer', () => {
  return {
    ChartContainer: ({children}) =>
      mockCloneElement(children, {
        dimensions: {
          width: 600,
          height: 400,
        },
      }),
  };
});

jest.mock(
  '../../packages/polaris-viz-core/src/styles/shared/_variables.scss',
  () => {
    const actual = jest.requireActual(
      '../../packages/polaris-viz-core/src/styles/shared/_variables.scss',
    );

    return {
      ...actual,

      colorGray30: '#dadadd',
      colorGray70: '#9d9da5',
      colorGray140: '#43434e',
      colorGray150: '#2e2e36',
      colorGray160: '#1f1f25',

      colorTeal70: '#4c9aaf',

      colorBlue20: '#eeeeef',
      colorBlue70: '#4b92e5',
      colorBlue80: '#4282cd',
      colorBlue90: '#3672bb',
      colorBlue110: '#5e5e69',

      colorIndigo70: '#997afc',
      colorIndigo90: '#7f4afa',

      colorPurple70: '#b176e2',
      colorMagenta70: '#da62c4',
      colorOrange70: '#ca7d4a',
      colorYellow70: '#97933e',

      colorDarkComparison: 'rgba(144, 176, 223, 0.6)',

      colorWhite: '#ffffff',
    };
  },
);

jest.mock('../../packages/polaris-viz/src/constants.ts', () => {
  const actual = jest.requireActual(
    '../../packages/polaris-viz/src/constants.ts',
  );

  return {
    ...actual,
    Y_AXIS_CHART_SPACING: 20,
    LABEL_AREA_TOP_SPACING: 16,
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

jest.mock('../../packages/polaris-viz-core/src/constants.ts', () => {
  const actual = jest.requireActual(
    '../../packages/polaris-viz-core/src/constants.ts',
  );

  return {
    ...actual,
    LABEL_AREA_TOP_SPACING: 16,
    Y_AXIS_CHART_SPACING: 20,
  };
});

if (typeof window !== 'undefined') {
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
}

Globals.assign({
  skipAnimation: true,
});

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});
