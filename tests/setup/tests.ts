import '@shopify/react-testing/matchers';
import {destroyAll} from '@shopify/react-testing';
import {cloneElement} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Globals} from '@react-spring/web';

import {useChartContext} from '../../packages/polaris-viz-core/src/hooks/useChartContext';

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

jest.mock('../../packages/polaris-viz-core/src/hooks/useChartContext', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const characterWidths = require('../../packages/polaris-viz/src/data/character-widths.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const characterWidthOffsets = require('../../packages/polaris-viz/src/data/character-width-offsets.json');

  return {
    useChartContext: jest.fn().mockReturnValue({
      shouldAnimate: false,
      id: null,
      characterWidths,
      characterWidthOffsets,
      theme: 'Light',
      isTouchDevice: false,
      isPerformanceImpacted: false,
      containerBounds: {
        width: 600,
        height: 400,
      },
      comparisonIndexes: [],
      comparisonSeriesIndexes: [],
      scrollContainer: null,
    }),
  };
});

export const useChartContextMock = useChartContext as jest.Mock;

jest.mock(
  '../../packages/polaris-viz-core/src/styles/shared/_variables.scss',
  () => {
    return {
      colorWhite: 'rgb(255, 255, 255)',
      colorBlack: 'rgb(0, 0, 0)',
      colorPurpleDark: 'rgb(80, 36, 143)',

      colorDarkComparison: 'rgba(144, 176, 223, 0.8)',
      colorLightComparison: 'rgba(103, 147, 204, 1)',

      colorGray00: '#ffffff',
      colorGray10: '#f6f6f7',
      colorGray20: '#eeeeef',
      colorGray30: '#dadadd',
      colorGray40: '#cbcbcf',
      colorGray50: '#bdbdc2',
      colorGray60: '#b0b0b6',
      colorGray70: '#9d9da5',
      colorGray80: '#909099',
      colorGray90: '#82828c',
      colorGray100: '#70707b',
      colorGray110: '#5e5e69',
      colorGray120: '#545460',
      colorGray130: '#4b4b57',
      colorGray140: '#43434e',
      colorGray150: '#2e2e36',
      colorGray160: '#1f1f25',

      colorIndigo00: '#f7f5ff',
      colorIndigo10: '#efecff',
      colorIndigo20: '#e4deff',
      colorIndigo30: '#d4cbff',
      colorIndigo40: '#c5b7fe',
      colorIndigo50: '#b6a3fe',
      colorIndigo60: '#a78ffd',
      colorIndigo70: '#997afc',
      colorIndigo80: '#8c63fb',
      colorIndigo90: '#7f4afa',
      colorIndigo100: '#7329f9',
      colorIndigo110: '#6511e2',
      colorIndigo120: '#540dbf',
      colorIndigo130: '#44089e',
      colorIndigo140: '#34057d',
      colorIndigo150: '#25035e',
      colorIndigo160: '#16013e',

      colorBlue00: '#f3f7ff',
      colorBlue10: '#e6eefe',
      colorBlue20: '#d6e3fd',
      colorBlue30: '#bdd2fb',
      colorBlue40: '#a3c2f7',
      colorBlue50: '#88b1f2',
      colorBlue60: '#6ba2ec',
      colorBlue70: '#4b92e5',
      colorBlue80: '#4282cd',
      colorBlue90: '#3672bb',
      colorBlue100: '#2b62a9',
      colorBlue110: '#215297',
      colorBlue120: '#174385',
      colorBlue130: '#0e3572',
      colorBlue140: '#06275f',
      colorBlue150: '#021a4c',
      colorBlue160: '#000d36',

      colorTeal00: '#f0f8fb',
      colorTeal10: '#e0f1f8',
      colorTeal20: '#c8e7f4',
      colorTeal30: '#9edaef',
      colorTeal40: '#79cce5',
      colorTeal50: '#69bbd3',
      colorTeal60: '#5baac1',
      colorTeal70: '#4c9aaf',
      colorTeal80: '#3f899e',
      colorTeal90: '#33798c',
      colorTeal100: '#286a7b',
      colorTeal110: '#1d5a69',
      colorTeal120: '#144b59',
      colorTeal130: '#0b3d48',
      colorTeal140: '#042f38',
      colorTeal150: '#012129',
      colorTeal160: '#001419',

      colorMagenta00: '#fcf4fa',
      colorMagenta10: '#f9e9f5',
      colorMagenta20: '#f5dbef',
      colorMagenta30: '#f0c4e6',
      colorMagenta40: '#eaaedd',
      colorMagenta50: '#e596d4',
      colorMagenta60: '#e07dcc',
      colorMagenta70: '#da62c4',
      colorMagenta80: '#c654b1',
      colorMagenta90: '#b1489e',
      colorMagenta100: '#9c3c8b',
      colorMagenta110: '#873178',
      colorMagenta120: '#722665',
      colorMagenta130: '#5e1c53',
      colorMagenta140: '#4a1341',
      colorMagenta150: '#370b30',
      colorMagenta160: '#23041e',

      colorPurple00: '#f9f5ff',
      colorPurple10: '#f3eafe',
      colorPurple20: '#ebdcfd',
      colorPurple30: '#e0c8fa',
      colorPurple40: '#d4b3f6',
      colorPurple50: '#c89ef1',
      colorPurple60: '#bd8aea',
      colorPurple70: '#b176e2',
      colorPurple80: '#a85de0',
      colorPurple90: '#9f41dc',
      colorPurple100: '#8c35c4',
      colorPurple110: '#7a29ab',
      colorPurple120: '#671e93',
      colorPurple130: '#55147a',
      colorPurple140: '#430b62',
      colorPurple150: '#32054a',
      colorPurple160: '#200132',

      colorOrange00: '#fcf5f3',
      colorOrange10: '#f9ebe6',
      colorOrange20: '#f5ddd4',
      colorOrange30: '#f1c9b8',
      colorOrange40: '#eeb498',
      colorOrange50: '#ec9d71',
      colorOrange60: '#df8b55',
      colorOrange70: '#ca7d4a',
      colorOrange80: '#b66e3f',
      colorOrange90: '#a26134',
      colorOrange100: '#8e532a',
      colorOrange110: '#7a4621',
      colorOrange120: '#673a17',
      colorOrange130: '#552d0d',
      colorOrange140: '#432205',
      colorOrange150: '#311701',
      colorOrange160: '#1f0c00',

      colorYellow00: '#fff6df',
      colorYellow10: '#fcedc2',
      colorYellow20: '#fae275',
      colorYellow30: '#e6d25f',
      colorYellow40: '#d1c256',
      colorYellow50: '#bdb24e',
      colorYellow60: '#aaa246',
      colorYellow70: '#97933e',
      colorYellow80: '#858337',
      colorYellow90: '#74742c',
      colorYellow100: '#636522',
      colorYellow110: '#535718',
      colorYellow120: '#444810',
      colorYellow130: '#363a08',
      colorYellow140: '#2a2d03',
      colorYellow150: '#1d1f01',
      colorYellow160: '#111200',
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
