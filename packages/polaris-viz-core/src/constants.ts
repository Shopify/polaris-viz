import {createElement} from 'react';

import variables from './styles/shared/_variables.scss';
import {createGradient} from './utilities/createGradient';
import {
  InternalChartType,
  SvgComponents,
  Theme,
  ChartState,
  Hue,
} from './types';

export const LINE_HEIGHT = 14;
export const FONT_SIZE = 12;

export const TICK_SIZE = 6;
export const SPACING_TIGHT = Number(variables.spacingTight);
export const SPACING_EXTRA_TIGHT = Number(variables.spacingExtraTight);
export const SPACING = Number(variables.spacing);
export const SPACING_BASE_TIGHT = Number(variables.spacingBaseTight);
export const SPACING_LOOSE = Number(variables.spacingLoose);
export const XMLNS = 'http://www.w3.org/2000/svg';

export const BASE_ANIMATION_DURATION = 200;
export const LOAD_ANIMATION_DURATION = 500;
export const SHAPE_ANIMATION_HEIGHT_BUFFER = 30;

export const DEFAULT_BORDER_RADIUS = 3;
export const MIN_WIDTH_BORDER_RADIUS = 2;
export const BORDER_RADIUS = {
  None: '0 0 0 0',
  Top: `${DEFAULT_BORDER_RADIUS} ${DEFAULT_BORDER_RADIUS} 0 0`,
  Right: `0 ${DEFAULT_BORDER_RADIUS} ${DEFAULT_BORDER_RADIUS} 0`,
  Bottom: `0 0 ${DEFAULT_BORDER_RADIUS} ${DEFAULT_BORDER_RADIUS}`,
  Left: `${DEFAULT_BORDER_RADIUS} 0 0 ${DEFAULT_BORDER_RADIUS}`,
  All: `${DEFAULT_BORDER_RADIUS}`,
};

export const HORIZONTAL_BAR_LABEL_HEIGHT = 12;
export const HORIZONTAL_BAR_LABEL_OFFSET = 10;
export const HORIZONTAL_GROUP_LABEL_HEIGHT = 20;
export const HORIZONTAL_SPACE_BETWEEN_SETS = 16;
export const HORIZONTAL_SPACE_BETWEEN_SINGLE = 2;
export const HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS = 5;
export const MAX_X_AXIS_LINES = 3;

export const LINE_ANIMATION_FAST_DURATION = 100;
export const LINE_ANIMATION_SLOW_DURATION = 325;
export const LINE_ANIMATION_FAST_COUNT = 10;
export const LINE_ANIMATION_DURATION_STEP = 25;
export const BELOW_X_AXIS_MARGIN = 24;
export const DIAGONAL_ANGLE = -40;
export const MIN_HORIZONTAL_LABEL_SPACE = 25;
export const DEFAULT_LABEL_RATIO = 2;
export const MIN_HORIZONTAL_TICKS = 3;
export const LABEL_ELLIPSIS_LENGTH = 3;
export const SMALL_LABEL_WIDTH = 50;
export const LABEL_SPACE_MINUS_FIRST_AND_LAST = 0.6;
export const DEFAULT_MAX_Y = 10;
export const MIN_BAR_HEIGHT = 2;
export const EMPTY_STATE_CHART_MIN = 0;
export const EMPTY_STATE_CHART_MAX = 10;

export const DONUT_CHART_CORNER_RADIUS = 2;
export const DONUT_CHART_THICKNESS = 18;

export enum ChartMargin {
  Top = 5,
  Left = 0,
  Bottom = BELOW_X_AXIS_MARGIN,
  Right = 0,
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

export const BARS_LOAD_ANIMATION_CONFIG = {
  mass: 1,
  tension: 140,
  friction: 18,
};

export const ARC_LOAD_ANIMATION_CONFIG = {
  mass: 1,
  tension: 150,
  friction: 10,
};

export const ARC_DATA_CHANGE_ANIMATION_CONFIG = {
  mass: 1,
  tension: 150,
  friction: 20,
  restVelocity: 200,
};
export const MAX_TRAIL_DURATION = 500;
export const HORIZONTAL_BAR_GROUP_DELAY = 200;

export const MASK_HIGHLIGHT_COLOR = variables.colorWhite;
export const MASK_SUBDUE_COLOR = '#434343';

export const colorWhite = variables.colorWhite;
export const colorBlack = variables.colorBlack;
export const colorPurpleDark = variables.colorPurpleDark;
export const colorTeal = variables.colorTeal;

export const DEFAULT_THEME_NAME = 'Default';

export const NEUTRAL_SINGLE_GRADIENT = [
  {offset: 0, color: variables.colorIndigo90},
  {offset: 85, color: variables.colorBlue90},
  {offset: 100, color: variables.colorBlue70},
];

export const DEFAULT_THEME: Theme = {
  seriesColors: {
    empty: variables.colorGray140,
    comparison: variables.colorDarkComparison,
    single: NEUTRAL_SINGLE_GRADIENT,
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
    backgroundColor: variables.colorGray150,
    textColor: variables.colorWhite,
    titleColor: variables.colorGray50,
  },
  chartContainer: {
    borderRadius: '0px',
    padding: '0px',
    backgroundColor: variables.colorGray160,
    sparkChartMinHeight: 40,
    minHeight: 200,
  },
  line: {
    hasArea: true,
    hasSpline: true,
    width: 2,
    pointStroke: 'variables.colorGray160',
  },
  arc: {
    cornerRadius: DONUT_CHART_CORNER_RADIUS,
    thickness: DONUT_CHART_THICKNESS,
  },
  bar: {
    hasRoundedCorners: true,
    zeroValueColor: variables.colorGray80,
  },
  grid: {
    showHorizontalLines: true,
    color: variables.colorGray140,
    horizontalOverflow: true,
    horizontalMargin: 16,
  },
  xAxis: {
    labelColor: variables.colorGray30,
    hide: false,
  },
  yAxis: {
    backgroundColor: variables.colorGray160,
    labelColor: variables.colorGray30,
  },
  crossHair: {
    color: variables.colorGray70,
    width: 1,
  },
  legend: {
    valueColor: variables.colorGray70,
    labelColor: variables.colorGray30,
    backgroundColor: variables.colorGray150,
    trendIndicator: {
      positive: '#03AB92',
      negative: '#f24f62',
      neutral: '#8C9196',
    },
  },
  annotations: {
    backgroundColor: variables.colorGray140,
    textColor: variables.colorGray30,
    titleColor: variables.colorWhite,
    linkColor: variables.colorBlue40,
    axisLabelColor: variables.colorGray80,
    lineColor: variables.colorGray80,
  },
};

export const LIGHT_THEME: Theme = {
  seriesColors: {
    empty: variables.colorGray20,
    comparison: variables.colorLightComparison,
    single: NEUTRAL_SINGLE_GRADIENT,
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
      createGradient(variables.colorPurple70, variables.colorPurple90),
      createGradient(variables.colorMagenta70, variables.colorMagenta90),
      createGradient(variables.colorOrange70, variables.colorOrange90),
      createGradient(variables.colorYellow70, variables.colorYellow90),
    ],
    all: [
      variables.colorTeal90,
      variables.colorBlue70,
      variables.colorIndigo90,
      variables.colorPurple70,
      variables.colorMagenta90,
      variables.colorOrange80,
      variables.colorYellow50,
      variables.colorTeal70,
      variables.colorBlue80,
      variables.colorIndigo70,
      variables.colorPurple90,
      variables.colorMagenta70,
      variables.colorOrange110,
      variables.colorYellow70,
    ],
  },
  tooltip: {
    backgroundColor: variables.colorGray00,
    textColor: variables.colorGray160,
    titleColor: variables.colorGray100,
  },
  chartContainer: {
    ...DEFAULT_THEME.chartContainer,
    borderRadius: '0px',
    padding: '0px',
    backgroundColor: variables.colorGray00,
  },
  line: {
    hasArea: true,
    hasSpline: true,
    width: 2,
    pointStroke: variables.colorGray00,
  },
  arc: {
    cornerRadius: 2,
    thickness: 18,
  },
  bar: {
    hasRoundedCorners: true,
    zeroValueColor: variables.colorGray70,
  },
  grid: {
    showHorizontalLines: true,
    color: variables.colorGray20,
    horizontalOverflow: true,
    horizontalMargin: 16,
  },
  xAxis: {
    labelColor: variables.colorGray100,
    hide: false,
  },
  yAxis: {
    backgroundColor: variables.colorGray00,
    labelColor: variables.colorGray100,
  },
  crossHair: {
    color: variables.colorGray40,
    width: 1,
  },
  legend: {
    valueColor: variables.colorGray160,
    labelColor: variables.colorGray100,
    backgroundColor: variables.colorGray10,
    trendIndicator: {
      positive: '#119d7f',
      negative: '#eb4c5e',
      neutral: '#8C9196',
    },
  },
  annotations: {
    backgroundColor: variables.colorGray140,
    textColor: variables.colorGray30,
    titleColor: variables.colorWhite,
    linkColor: variables.colorBlue40,
    axisLabelColor: variables.colorGray70,
    lineColor: variables.colorGray70,
  },
};

export const PRINT_THEME = {
  ...LIGHT_THEME,
  seriesColors: {
    empty: variables.colorGray20,
    comparison: variables.colorLightComparison,
    single: variables.colorIndigo90,
    upToFour: [
      variables.colorIndigo70,
      variables.colorBlue70,
      variables.colorMagenta70,
      variables.colorTeal70,
    ],
    fromFiveToSeven: [
      variables.colorTeal70,
      variables.colorBlue70,
      variables.colorIndigo70,
      variables.colorPurple70,
      variables.colorMagenta70,
      variables.colorOrange70,
      variables.colorYellow70,
    ],
    all: [
      variables.colorTeal90,
      variables.colorBlue70,
      variables.colorIndigo90,
      variables.colorPurple70,
      variables.colorMagenta90,
      variables.colorOrange80,
      variables.colorYellow50,
      variables.colorTeal70,
      variables.colorBlue80,
      variables.colorIndigo70,
      variables.colorPurple90,
      variables.colorMagenta70,
      variables.colorOrange110,
      variables.colorYellow70,
    ],
  },
};

export const STACKED_BAR_GAP = 2;
export const COLOR_VISION_ACTIVE_OPACITY = 1;
export const COLOR_VISION_FADED_OPACITY = 0.3;
export const DEFAULT_LEGEND_HEIGHT = 29;
export const COLOR_VISION_SINGLE_ITEM = 'singleItem';
export const COLOR_VISION_GROUP_ITEM = 'group';
export const LEGENDS_TOP_MARGIN = 16;

export const Y_AXIS_CHART_SPACING = SPACING_LOOSE;
export const LABEL_AREA_MIN_HEIGHT = 15;
export const LABEL_AREA_MAX_HEIGHT = 80;
export const LABEL_AREA_TOP_SPACING = SPACING;
export const ELLIPSIS = '…';
export const X_AXIS_LABEL_PADDING = 10;
export const HORIZONTAL_LABEL_MIN_WIDTH = 46;
export const HORIZONTAL_LABEL_TARGET_HEIGHT = 80;
export const DIAGONAL_LABEL_MIN_WIDTH = 30;
export const MAX_DIAGONAL_LABEL_WIDTH = 100;
// Visible height of a 100px wide label at 45deg
export const MAX_DIAGONAL_VISIBLE_HEIGHT = 80;
export const VERTICAL_LABEL_TARGET_WIDTH = 80;
export const VERTICAL_LABEL_MIN_WIDTH = 14;
export const DEFAULT_COMPONENTS: SvgComponents = {
  Svg: ({children, ...props}) => createElement('svg', props, children),
  Circle: ({children, ...props}) => createElement('circle', props, children),
  Ellipse: ({children, ...props}) => createElement('ellipse', props, children),
  // eslint-disable-next-line id-length
  G: ({children, ...props}) => createElement('g', props, children),
  Text: ({children, ...props}) => createElement('text', props, children),
  TSpan: ({children, ...props}) => createElement('tSpan', props, children),
  TextPath: ({children, ...props}) =>
    createElement('textPath', props, children),
  Path: ({children, ...props}) => createElement('path', props, children),
  Polygon: ({children, ...props}) => createElement('polygon', props, children),
  Polyline: ({children, ...props}) =>
    createElement('polyline', props, children),
  Line: ({children, ...props}) => createElement('line', props, children),
  Rect: ({children, ...props}) => createElement('rect', props, children),
  Use: ({children, ...props}) => createElement('use', props, children),
  Image: ({children, ...props}) => createElement('image', props, children),
  Symbol: ({children, ...props}) => createElement('symbol', props, children),
  Defs: ({children, ...props}) => createElement('defs', props, children),
  LinearGradient: ({children, ...props}) =>
    createElement('linearGradient', props, children),
  RadialGradient: ({children, ...props}) =>
    createElement('radialGradient', props, children),
  Stop: ({children, ...props}) => createElement('stop', props, children),
  ClipPath: ({children, ...props}) =>
    createElement('clipPath', props, children),
  Pattern: ({children, ...props}) => createElement('pattern', props, children),
  Mask: ({children, ...props}) => createElement('mask', props, children),
};

export const STROKE_WIDTH = 1.5;
export const ANIMATION_MARGIN = 17;
export const LINEAR_LABELS_INNER_PADDING = 10;

export const COLOR_VISION_EVENT = {
  name: 'color-vision-event',
  dataAttribute: 'data-color-vision-event',
  camelCaseName: 'colorVisionEvent',
};

export const DEFAULT_CHART_PROPS = {
  isAnimated: true,
  theme: DEFAULT_THEME_NAME,
  state: ChartState.Success,
  errorText: 'Could not load the chart',
};

export const TOO_MANY_DATA_POINTS_THRESHOLD = {
  [InternalChartType.Bar]: 60,
  [InternalChartType.Line]: 150,
  [InternalChartType.Combo]: 60,
};

export const TOO_MANY_DATA_SERIES_THRESHOLD = 14;
export const LINE_SERIES_POINT_RADIUS = 2;

export const HUES: {[key in Hue]: string[]} = {
  [Hue.Teal]: [
    variables.colorTeal00,
    variables.colorTeal10,
    variables.colorTeal20,
    variables.colorTeal30,
    variables.colorTeal40,
    variables.colorTeal50,
    variables.colorTeal60,
    variables.colorTeal70,
    variables.colorTeal80,
    variables.colorTeal90,
    variables.colorTeal100,
    variables.colorTeal110,
    variables.colorTeal120,
    variables.colorTeal130,
    variables.colorTeal140,
    variables.colorTeal150,
    variables.colorTeal160,
  ],
  [Hue.Blue]: [
    variables.colorBlue00,
    variables.colorBlue10,
    variables.colorBlue20,
    variables.colorBlue30,
    variables.colorBlue40,
    variables.colorBlue50,
    variables.colorBlue60,
    variables.colorBlue70,
    variables.colorBlue80,
    variables.colorBlue90,
    variables.colorBlue100,
    variables.colorBlue110,
    variables.colorBlue120,
    variables.colorBlue130,
    variables.colorBlue140,
    variables.colorBlue150,
    variables.colorBlue160,
  ],
  [Hue.Indigo]: [
    variables.colorIndigo00,
    variables.colorIndigo10,
    variables.colorIndigo20,
    variables.colorIndigo30,
    variables.colorIndigo40,
    variables.colorIndigo50,
    variables.colorIndigo60,
    variables.colorIndigo70,
    variables.colorIndigo80,
    variables.colorIndigo90,
    variables.colorIndigo100,
    variables.colorIndigo110,
    variables.colorIndigo120,
    variables.colorIndigo130,
    variables.colorIndigo140,
    variables.colorIndigo150,
    variables.colorIndigo160,
  ],
  [Hue.Purple]: [
    variables.colorPurple00,
    variables.colorPurple10,
    variables.colorPurple20,
    variables.colorPurple30,
    variables.colorPurple40,
    variables.colorPurple50,
    variables.colorPurple60,
    variables.colorPurple70,
    variables.colorPurple80,
    variables.colorPurple90,
    variables.colorPurple100,
    variables.colorPurple110,
    variables.colorPurple120,
    variables.colorPurple130,
    variables.colorPurple140,
    variables.colorPurple150,
    variables.colorPurple160,
  ],
  [Hue.Magenta]: [
    variables.colorMagenta00,
    variables.colorMagenta10,
    variables.colorMagenta20,
    variables.colorMagenta30,
    variables.colorMagenta40,
    variables.colorMagenta50,
    variables.colorMagenta60,
    variables.colorMagenta70,
    variables.colorMagenta80,
    variables.colorMagenta90,
    variables.colorMagenta100,
    variables.colorMagenta110,
    variables.colorMagenta120,
    variables.colorMagenta130,
    variables.colorMagenta140,
    variables.colorMagenta150,
    variables.colorMagenta160,
  ],
  [Hue.Orange]: [
    variables.colorOrange00,
    variables.colorOrange10,
    variables.colorOrange20,
    variables.colorOrange30,
    variables.colorOrange40,
    variables.colorOrange50,
    variables.colorOrange60,
    variables.colorOrange70,
    variables.colorOrange80,
    variables.colorOrange90,
    variables.colorOrange100,
    variables.colorOrange110,
    variables.colorOrange120,
    variables.colorOrange130,
    variables.colorOrange140,
    variables.colorOrange150,
    variables.colorOrange160,
  ],
  [Hue.Yellow]: [
    variables.colorYellow00,
    variables.colorYellow10,
    variables.colorYellow20,
    variables.colorYellow30,
    variables.colorYellow40,
    variables.colorYellow50,
    variables.colorYellow60,
    variables.colorYellow70,
    variables.colorYellow80,
    variables.colorYellow90,
    variables.colorYellow100,
    variables.colorYellow110,
    variables.colorYellow120,
    variables.colorYellow130,
    variables.colorYellow140,
    variables.colorYellow150,
    variables.colorYellow160,
  ],
};
