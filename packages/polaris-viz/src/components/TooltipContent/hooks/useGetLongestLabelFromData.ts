import {estimateStringWidth, useChartContext} from '@shopify/polaris-viz-core';

import type {TooltipData} from '../../../types';

interface Size {
  width: number;
  keyWidth: number;
  valueWidth: number;
}

export function useGetLongestLabelFromData(tooltipData: TooltipData[] = []) {
  const {characterWidths} = useChartContext();

  const sizes: Size[] = [];

  tooltipData.forEach(({data}) => {
    data.forEach(({key, value}) => {
      const keyWidth = estimateStringWidth(key, characterWidths);
      const valueWidth = estimateStringWidth(value, characterWidths);

      sizes.push({
        width: keyWidth + valueWidth,
        keyWidth,
        valueWidth,
      });
    });
  });

  const {keyWidth, valueWidth} = sizes.reduce((prev, cur) => {
    if (prev.width < cur.width) {
      return cur;
    }

    return prev;
  }, sizes[0]);

  return {
    keyWidth,
    valueWidth,
  };
}
