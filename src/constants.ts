import type {Theme} from './types';
import variables from './styles/shared/_variables.scss';

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

export const colorSky = variables.colorSky;
export const colorWhite = variables.colorWhite;
export const colorBlack = variables.colorBlack;
export const colorPurpleDark = variables.colorPurpleDark;
export const colorBlue = variables.colorBlue;
export const colorTeal = variables.colorTeal;
export const colorSkyDark = variables.colorSkyDark;
export const positiveColor = variables.positiveColor;
export const negativeColor = variables.negativeColor;

const createGradient = (color1: string, color2: string) => {
  return [
    {offset: 0, color: color2},
    {offset: 100, color: color1},
  ];
};

export const DEFAULT_THEME: Theme = {
  seriesColors: {
    upToFour: [
      createGradient(variables.colorIndigo70, variables.colorIndigo90),
      createGradient(variables.colorBlue70, variables.colorBlue90),
      createGradient(variables.colorMagenta70, variables.colorMagenta90),
      createGradient(variables.colorTeal70, variables.colorTeal90),
    ],
    fromFiveToSeven: [
      createGradient(variables.colorTeal70, variables.colorTeal90),
      createGradient(variables.colorBlue70, variables.colorBlue90),
      createGradient(variables.colorIndigo70, variables.colorIndigo90),
      createGradient(variables.colorPurple50, variables.colorPurple70),
      createGradient(variables.colorMagenta70, variables.colorMagenta90),
      createGradient(variables.colorOrange60, variables.colorOrange80),
      createGradient(variables.colorYellow20, variables.colorYellow40),
    ],
    all: [
      variables.colorTeal90,
      variables.colorBlue50,
      variables.colorIndigo90,
      variables.colorPurple70,
      variables.colorMagenta90,
      variables.colorOrange50,
      variables.colorYellow70,
      variables.colorTeal40,
      variables.colorBlue80,
      variables.colorIndigo40,
      variables.colorPurple90,
      variables.colorMagenta70,
      variables.colorOrange80,
      variables.colorYellow20,
    ],
  },
  tooltip: {
    backgroundColor: variables.colorGray03,
    valueColor: variables.colorGray15,
    labelColor: variables.colorGray13,
  },
  chartContainer: {
    borderRadius: '0px',
    padding: '0px',
    backgroundColor: variables.colorGray01,
  },
  line: {
    sparkArea: [
      {offset: 0, color: 'rgba(92, 105, 208, 0)'},
      {offset: 100, color: 'rgba(92, 105, 208, 0.15)'},
    ],
    hasSpline: true,
    style: 'solid',
    hasPoint: true,
    width: 2,
    pointStroke: variables.colorGray15,
    dottedStrokeColor: variables.colorDarkComparison,
  },
  bar: {
    hasRoundedCorners: true,
    innerMargin: 'Medium',
    outerMargin: 'Medium',
    zeroAsMinHeight: false,
  },
  grid: {
    showVerticalLines: false,
    showHorizontalLines: true,
    color: variables.colorGray05,
    horizontalOverflow: false,
    horizontalMargin: 0,
  },
  xAxis: {
    showTicks: false,
    labelColor: variables.colorGray13,
    hide: false,
  },
  yAxis: {
    backgroundColor: variables.colorGray01,
    labelColor: variables.colorGray13,
  },
  crossHair: {
    color: 'rgb(139, 159, 176)',
    width: 1,
  },
  legend: {
    labelColor: '#DADADD',
    valueColor: '#fff',
    trendIndicator: {
      positive: '#00A47C',
      negative: '#EC6E6E',
      neutral: '#8C9196',
    },
  },
};

export const animationDurationBase = 200;
export const XMLNS = 'http://www.w3.org/2000/svg';
