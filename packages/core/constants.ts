import variables from './styles/shared/_variables.scss';

export const XMLNS = 'http://www.w3.org/2000/svg';

export const BASE_ANIMATION_DURATION = 200;
export const LOAD_ANIMATION_DURATION = 500;
export const BAR_ANIMATION_HEIGHT_BUFFER = 20;

export const DEFAULT_BORDER_RADIUS = 3;
export const MIN_WIDTH_BORDER_RADIUS = 2;

export const FONT_SIZE_PADDING = 1;

export const HORIZONTAL_BAR_LABEL_HEIGHT = 12;
export const HORIZONTAL_BAR_LABEL_OFFSET = 10;
export const HORIZONTAL_GROUP_LABEL_HEIGHT = 20;
export const HORIZONTAL_SPACE_BETWEEN_SETS = 16;
export const HORIZONTAL_SPACE_BETWEEN_SINGLE = 2;
export const HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS = 10;
export const MAX_X_AXIS_LINES = 3;

export const LINE_ANIMATION_FAST_DURATION = 100;
export const LINE_ANIMATION_SLOW_DURATION = 325;
export const LINE_ANIMATION_FAST_COUNT = 10;
export const LINE_ANIMATION_DURATION_STEP = 25;
export const BELOW_X_AXIS_MARGIN = 24;
export const SMALL_SCREEN = 500;
export const SMALL_FONT_SIZE = 10;
export const DIAGONAL_ANGLE = -40;
export const MIN_HORIZONTAL_LABEL_SPACE = 25;
export const DEFAULT_LABEL_RATIO = 2;
export const MIN_HORIZONTAL_TICKS = 3;
export const LINE_HEIGHT = 15;
export const LABEL_ELLIPSIS_LENGTH = 3;
export const SMALL_LABEL_WIDTH = 50;
export const LABEL_SPACE_MINUS_FIRST_AND_LAST = 0.6;
export const DEFAULT_MAX_Y = 10;
export const ROUNDED_BAR_RADIUS = 4;
export const MIN_BAR_HEIGHT = 2;
export const EMPTY_STATE_CHART_MIN = 0;
export const EMPTY_STATE_CHART_MAX = 10;
export const TICK_SIZE = 6;
export const FONT_SIZE = 12;

export const SPACING_TIGHT = Number(variables.spacingTight);
export const SPACING_EXTRA_TIGHT = Number(variables.spacingExtraTight);
export const SPACING = Number(variables.spacing);
export const SPACING_BASE_TIGHT = Number(variables.spacingBaseTight);

export enum BarChartMargin {
  Top = 5,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = Number(variables.spacingLoose),
}

export enum LineChartMargin {
  Top = SPACING_TIGHT,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = SPACING_EXTRA_TIGHT,
}

export const BARS_TRANSITION_CONFIG = {mass: 1, tension: 150, friction: 16};

export const BARS_SORT_TRANSITION_CONFIG = {
  mass: 1,
  tension: 150,
  friction: 20,
  restVelocity: 200,
};

export const LINES_LOAD_ANIMATION_CONFIG = {
  mass: 1,
  tension: 140,
  friction: 18,
};
export const MAX_TRAIL_DURATION = 500;
export const HORIZONTAL_BAR_GROUP_DELAY = 200;

export const MASK_HIGHLIGHT_COLOR = variables.colorWhite;
export const MASK_SUBDUE_COLOR = '#434343';

export const colorWhite = variables.colorWhite;
export const colorBlack = variables.colorBlack;
export const colorPurpleDark = variables.colorPurpleDark;
export const colorTeal = variables.colorTeal;

export const NEUTRAL_SINGLE_GRADIENT = [
  {offset: 0, color: variables.colorIndigo90},
  {offset: 85, color: variables.colorBlue90},
  {offset: 100, color: variables.colorBlue70},
];
