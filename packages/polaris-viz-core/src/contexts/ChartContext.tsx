import {createContext} from 'react';

import {DEFAULT_THEME_NAME} from '../constants';

export interface ChartContextValues {
  id: string | null;
  characterWidths: {[key: string]: number};
  characterWidthOffsets: {[key: string]: number};
  shouldAnimate: boolean;
  theme: string;
}

export const ChartContext = createContext<ChartContextValues>({
  id: null,
  characterWidths: {},
  characterWidthOffsets: {},
  shouldAnimate: true,
  theme: DEFAULT_THEME_NAME,
});
