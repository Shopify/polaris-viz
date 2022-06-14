import {ChartContext} from '@shopify/polaris-viz-core';
import {useContext, useMemo} from 'react';

import type {FormattedTicks} from '../../../types';
import {getLongestTickWidth} from '../utilities/getLongestTickWidth';

export function useDualAxisTicksWidth(
  leftTicks: FormattedTicks[],
  rightTicks: FormattedTicks[],
) {
  const {characterWidths} = useContext(ChartContext);

  return useMemo(() => {
    return {
      leftTickWidth: getLongestTickWidth(leftTicks, characterWidths),
      rightTickWidth: getLongestTickWidth(rightTicks, characterWidths),
    };
  }, [leftTicks, rightTicks, characterWidths]);
}
