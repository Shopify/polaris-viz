import type {Theme} from './types';
import variables from './styles/shared/_variables.scss';

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
    // ...DIVERGING_SPLIT_COMPLEMENTARY,
    ...DIVERGING_QUINARY,
  ],
};

export const animationDurationBase = 200;
