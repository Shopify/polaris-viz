import {createContext} from 'react';

export interface ChartContextValues {
  id: string | null;
  characterWidths: {[key: string]: number};
  characterWidthOffsets: {[key: string]: number};
  shouldAnimate: boolean;
}

export const ChartContext = createContext<ChartContextValues>({
  id: null,
  characterWidths: {},
  characterWidthOffsets: {},
  shouldAnimate: true,
});
