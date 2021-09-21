import {Size} from './types';

export const LABEL_HEIGHT = 24;
export const SPACE_BETWEEN_SETS = 16;
export const SPACE_BETWEEN_SINGLE = 2;
export const BAR_LABEL_OFFSET = 10;
export const BAR_LABEL_HEIGHT = 12;
export const NEGATIVE_GRADIENT_ID = 'grad-negative';
export const GRADIENT_ID = 'grad-';
export const FONT_SIZE_PADDING = 1;
export const STACKED_BAR_GAP = 2;

export const SIZES: {[key in Size]: number} = {
  [Size.Small]: 6,
  [Size.Medium]: 16,
  [Size.Large]: 26,
};
