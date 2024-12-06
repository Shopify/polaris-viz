export const FUNNEL_CONNECTOR_Y_OFFSET = 30;
export const TOOLTIP_WIDTH = 250;

export const LINE_OFFSET = 3;
export const LINE_WIDTH = 1;
export const TOOLTIP_HEIGHT = 90;
export const SHORT_TOOLTIP_HEIGHT = 65;
export const GAP = 1;

export const PERCENTAGE_COLOR = 'rgba(48, 48, 48, 1)';
export const LINE_GRADIENT = [
  {
    color: 'rgba(227, 227, 227, 1)',
    offset: 0,
  },
  {
    color: 'rgba(227, 227, 227, 0)',
    offset: 100,
  },
];

export const LABELS_HEIGHT = 80;
export const PERCENTAGE_SUMMARY_HEIGHT = 30;

// Threshold to determine if we should scale the segments, i.e if the smallest segment is less than 10% of the tallest segment
export const SCALING_RATIO_THRESHOLD = 0.1;
