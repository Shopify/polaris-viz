import {useChartContext} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

import type {FormattedTicks} from '../../../types';
import {getLongestTickWidth} from '../utilities/getLongestTickWidth';

export function useDualAxisTicksWidth(
  leftTicks: FormattedTicks[],
  rightTicks: FormattedTicks[],
) {
  const {characterWidths} = useChartContext();

  return useMemo(() => {
    return {
      leftTickWidth: getLongestTickWidth(leftTicks, characterWidths),
      rightTickWidth: getLongestTickWidth(rightTicks, characterWidths),
    };
  }, [leftTicks, rightTicks, characterWidths]);
}
