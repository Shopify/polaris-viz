import {createContext} from 'react';
import type {CharacterWidthOffsets, CharacterWidths} from 'types';

import {DEFAULT_THEME_NAME} from '../constants';

export interface ChartContextValues {
  id: string | null;
  characterWidths: CharacterWidths;
  characterWidthOffsets: CharacterWidthOffsets;
  shouldAnimate: boolean;
  theme: string;
  isPerformanceImpacted: boolean;
  scrollElement?: HTMLElement;
}

export const ChartContext = createContext<ChartContextValues>({
  id: null,
  characterWidths: {},
  characterWidthOffsets: {
    fontSize: {},
    fontWeight: {},
  },
  shouldAnimate: true,
  theme: DEFAULT_THEME_NAME,
  isPerformanceImpacted: false,
});
