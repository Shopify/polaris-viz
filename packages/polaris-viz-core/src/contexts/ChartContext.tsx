import {createContext} from 'react';

import type {
  BoundingRect,
  CharacterWidthOffsets,
  CharacterWidths,
  ComparisonSeriesIndex,
} from '../types';
import {DEFAULT_THEME_NAME} from '../constants';

export interface ChartContextValues {
  id: string | null;
  characterWidths: CharacterWidths;
  characterWidthOffsets: CharacterWidthOffsets;
  containerBounds: BoundingRect;
  shouldAnimate: boolean;
  theme: string;
  isTouchDevice: boolean;
  isPerformanceImpacted: boolean;
  scrollContainer?: Element | null;
  comparisonIndexes: number[];
  comparisonSeriesIndexes: ComparisonSeriesIndex[];
}

export const ChartContext = createContext<ChartContextValues>({
  id: null,
  characterWidths: {},
  characterWidthOffsets: {
    fontSize: {},
    fontWeight: {},
  },
  containerBounds: {height: 0, width: 0, x: 0, y: 0},
  shouldAnimate: true,
  theme: DEFAULT_THEME_NAME,
  isTouchDevice: false,
  isPerformanceImpacted: false,
  comparisonIndexes: [],
  comparisonSeriesIndexes: [],
});
