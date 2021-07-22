import type {Theme} from './types';
import variables from './styles/shared/_variables.scss';
import {createTheme} from './utilities';

export const CROSSHAIR_WIDTH = 5;
export const SMALL_WIDTH = 300;
export const MIN_LABEL_SPACE = 100;
export const TICK_SIZE = 6;
export const FONT_SIZE = 12;
export const MIN_Y_LABEL_SPACE = 80;

export const SPACING_TIGHT = Number(variables.spacingTight);
export const SPACING_EXTRA_TIGHT = Number(variables.spacingExtraTight);
export const SPACING = Number(variables.spacing);
export const SPACING_BASE_TIGHT = Number(variables.spacingBaseTight);
export const SPACING_LOOSE = Number(variables.spacingLoose);

export const BELOW_X_AXIS_MARGIN = 24;
export const SMALL_SCREEN = 500;
export const SMALL_FONT_SIZE = 10;
export const DIAGONAL_ANGLE = -40;
export const TEXT_BOX_LINE_HEIGHT = 22.5;
export const MIN_HORIZONTAL_LABEL_SPACE = 25;
export const DEFAULT_LABEL_RATIO = 2;
export const MIN_HORIZONTAL_TICKS = 3;
export const LINE_HEIGHT = 15;
export const MAX_TEXT_BOX_HEIGHT = LINE_HEIGHT * 3;
export const SMALL_LABEL_WIDTH = 50;
export const LABEL_SPACE_MINUS_FIRST_AND_LAST = 0.6;
export const DEFAULT_MAX_Y = 10;
export const ROUNDED_BAR_RADIUS = 4;
export const MIN_BAR_HEIGHT = 2;
export const EMPTY_STATE_CHART_MIN = 0;
export const EMPTY_STATE_CHART_MAX = 10;

export const DEFAULT_GREY_LABEL = 'rgb(99, 115, 129)';
export const DEFAULT_CROSSHAIR_COLOR = variables.colorSky;

export enum BarChartMargin {
  Top = 5,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = SPACING_LOOSE,
}

export enum LineChartMargin {
  Top = SPACING_TIGHT,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = SPACING_EXTRA_TIGHT,
}

export const BARS_TRANSITION_CONFIG = {mass: 1, tension: 150, friction: 16};
export const MAX_TRAIL_DURATION = 500;

export const MASK_HIGHLIGHT_COLOR = variables.colorWhite;
export const MASK_SUBDUE_COLOR = '#434343';

const POSITIVE_COLOR = `rgba(46, 237, 145, 0.8)`;
const PRIMARY_NEUTRAL_COLOR = `rgba(152, 107, 255, 0.8)`;
const SECONDARY_NEUTRAL_COLOR = `rgba(58, 164, 246, 0.8)`;
const NEGATIVE_COLOR = `rgba(236, 110, 110, 0.8)`;
const COMPARISON_COLOR = `rgba(144, 176, 223, 0.6)`;

export const PRIMARY_COLOR = 'rgb(0,161,159)';
export const SECONDARY_COLOR = 'rgb(41,35,112)';
export const TERTIARY_COLOR = 'rgb(13,140,237)';
export const QUARTERNARY_COLOR = 'rgb(157,53,193)';

export const colorSky = variables.colorSky;
export const colorWhite = variables.colorWhite;
export const colorPurpleDark = variables.colorPurpleDark;
export const colorBlue = variables.colorBlue;
export const colorTeal = variables.colorTeal;
export const colorSkyDark = variables.colorSkyDark;
export const positiveColor = variables.positiveColor;
export const negativeColor = variables.negativeColor;

const VIZ_COMPARISON_GRADIENT = [
  {offset: 0, color: COMPARISON_COLOR},
  {offset: 100, color: COMPARISON_COLOR},
];

export const VIZ_GRADIENT_COLOR = {
  positive: {
    comparison: VIZ_COMPARISON_GRADIENT,
    up: [
      {offset: 0, color: PRIMARY_NEUTRAL_COLOR},
      {offset: 60, color: SECONDARY_NEUTRAL_COLOR},
      {offset: 100, color: POSITIVE_COLOR},
    ],
  },
  negative: {
    comparison: VIZ_COMPARISON_GRADIENT,
    up: [
      {offset: 0, color: SECONDARY_NEUTRAL_COLOR},
      {offset: 60, color: PRIMARY_NEUTRAL_COLOR},
      {offset: 100, color: NEGATIVE_COLOR},
    ],
    down: [
      {offset: 0, color: NEGATIVE_COLOR},
      {offset: 60, color: PRIMARY_NEUTRAL_COLOR},
      {offset: 100, color: SECONDARY_NEUTRAL_COLOR},
    ],
  },
  neutral: {
    up: [
      {offset: 0, color: PRIMARY_NEUTRAL_COLOR},
      {offset: 100, color: SECONDARY_NEUTRAL_COLOR},
    ],
    comparison: VIZ_COMPARISON_GRADIENT,
  },
};

const DIVERGING_SPLIT_COMPLEMENTARY = [
  '#986BFF',
  '#c3b3f9',
  '#27819c',
  '#3cb9de',
  '#248667',
  '#37c095',
  '#a36b22',
  '#e89a35',
  '#d8289b',
  '#f886c5',
];
const DIVERGING_QUINARY = [
  '#986BFF',
  '#c4b2ff',
  '#2d76d7',
  '#87aaf7',
  '#418369',
  '#60bc98',
  '#668022',
  '#94b835',
  '#a7683f',
  '#ec9761',
];

const BLUE_BASED_QUINARY = [
  '#3AA4F6',
  '#A3CAFA',
  '#A743F0',
  '#C697F7',
  '#46853E',
  '#67BF5C',
  '#A26B22',
  '#E79B35',
  '#D3415C',
  '#EA929D',
];

const BLUE_BASED_ANALOGOUS = [
  '#3AA4F6',
  '#a3cafa',
  '#9e54d4',
  '#c29be7',
  '#4a7f6a',
  '#6db79a',
  '#d15999',
  '#e5a7c4',
  '#9b6e3f',
  '#dd9f5d',
];

export const DEFAULT_THEME: Theme = {
  chartContainer: {
    borderRadius: '0px',
    padding: '0px',
    backgroundColor: '#1f1f25',
  },
  bar: {
    color: VIZ_GRADIENT_COLOR.neutral.up,
    hasRoundedCorners: true,
    innerMargin: 'Medium',
    outerMargin: 'Medium',
    zeroAsMinHeight: false,
  },
  grid: {
    showVerticalLines: false,
    showHorizontalLines: true,
    color: 'rgb(99, 115, 129)',
    horizontalOverflow: true,
    horizontalMargin: 20,
  },
  xAxis: {
    showTicks: false,
    labelColor: 'rgb(220, 220, 220)',
  },
  yAxis: {
    backgroundColor: '#1f1f25',
    labelColor: 'rgb(220, 220, 220)',
  },
  seriesColors: [
    [
      {offset: 0, color: '#6A5FCE'},
      {offset: 80, color: '#8981de'},
    ],
    [
      {offset: 0, color: '#74aee8'},
      {offset: 80, color: '#269ce8'},
    ],
    [
      {offset: 0, color: '#34cd98'},
      {offset: 80, color: '#a3d0a5'},
    ],
    [
      {offset: 0, color: '#d85f8c'},
      {offset: 80, color: '#e095af'},
    ],
    [
      {offset: 0, color: '#e772ff'},
      {offset: 80, color: '#eea9ff'},
    ],
    [
      {offset: 0, color: '#e3dcff'},
      {offset: 80, color: '#d0c3ff'},
    ],
    [
      {offset: 0, color: '#9cfff5'},
      {offset: 80, color: '#beead9'},
    ],
    [
      {offset: 0, color: '#ffa796'},
      {offset: 80, color: '#ffd9d5'},
    ],
    // [
    //   {offset: 0, color: '#a149e9'},
    //   {offset: 80, color: '#b877ee'},
    // ],
    // [
    //   {offset: 0, color: '#7070ff'},
    //   {offset: 80, color: '#a3a3ff'},
    // ],
    // [
    //   {offset: 0, color: '#64e8ba'},
    //   {offset: 80, color: '#90efce'},
    // ],
    // [
    //   {offset: 0, color: '#a4ee11'},
    //   {offset: 80, color: '#c9f570'},
    // ],
  ],
};

export const LIGHT_THEME = createTheme({
  chartContainer: {
    backgroundColor: '#FFF',
  },
  grid: {
    color: 'rgba(99, 115, 129, .4)',
  },
  xAxis: {
    showTicks: false,
    labelColor: 'rgba(99, 115, 129, .9)',
  },
  yAxis: {
    backgroundColor: '#FFF',
    labelColor: 'rgba(99, 115, 129, .9)',
  },
  seriesColors: [
    [
      {offset: 0, color: '#4439cc'},
      {offset: 80, color: '#705cec'},
    ],
    [
      {offset: 0, color: '#2487c3'},
      {offset: 80, color: '#2698DF'},
    ],
    [
      {offset: 0, color: '#007d68'},
      {offset: 80, color: '#008777'},
    ],
    [
      {offset: 0, color: '#ce4383'},
      {offset: 80, color: '#f0549a'},
    ],
    [
      {offset: 0, color: '#21247f'},
      {offset: 80, color: '#1e18ca'},
    ],
    [
      {offset: 0, color: '#14546d'},
      {offset: 80, color: '#14698b'},
    ],
    [
      {offset: 0, color: '#001711'},
      {offset: 80, color: '#00211a'},
    ],
    [
      {offset: 0, color: '#87235c'},
      {offset: 80, color: '#cc1278'},
    ],
    // [
    //   {offset: 0, color: '#00858e'},
    //   {offset: 80, color: '#008ca8'},
    // ],
    // [
    //   {offset: 0, color: '#5768ff'},
    //   {offset: 80, color: '#7070ff'},
    // ],
    // [
    //   {offset: 0, color: '#8f32e6'},
    //   {offset: 80, color: '#a149e9'},
    // ],
    // [
    //   {offset: 0, color: '#a111a1'},
    //   {offset: 80, color: '#b8149c'},
    // ],
  ],
});

export const animationDurationBase = 200;
