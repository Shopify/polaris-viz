import type {Theme} from './types';

export const CROSSHAIR_WIDTH = 5;
export const SPACING_TIGHT = 8;
export const SMALL_WIDTH = 300;
export const MIN_LABEL_SPACE = 100;
export const TICK_SIZE = 6;
export const FONT_SIZE = 12;
export const MIN_Y_LABEL_SPACE = 80;
export const SPACING_EXTRA_TIGHT = 4;
export const SPACING = 16;
export const SPACING_BASE_TIGHT = 12;
export const SPACING_LOOSE = 20;
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
export const DEFAULT_CROSSHAIR_COLOR = 'rgb(223, 227, 232)';

export enum BarChartMargin {
  Top = 5,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = 20,
}

export enum LineChartMargin {
  Top = SPACING_TIGHT,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = SPACING_EXTRA_TIGHT,
}

export const BARS_TRANSITION_CONFIG = {mass: 1, tension: 150, friction: 16};
export const MAX_TRAIL_DURATION = 500;

export const MASK_HIGHLIGHT_COLOR = '#FFF';
export const MASK_SUBDUE_COLOR = '#434343';

const POSITIVE_COLOR = `rgba(46, 237, 145, 0.8)`;
const PRIMARY_NEUTRAL_COLOR = `rgba(152, 107, 255, 0.8)`;
const SECONDARY_NEUTRAL_COLOR = `rgba(58, 164, 246, 0.8)`;
const NEGATIVE_COLOR = `rgba(236, 110, 110, 0.8)`;
const COMPARISON_COLOR = `rgba(144, 176, 223, 0.6)`;

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
};
