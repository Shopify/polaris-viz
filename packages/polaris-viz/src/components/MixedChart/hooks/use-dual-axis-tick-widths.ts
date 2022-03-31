import {useContext, useMemo} from 'react';

import type {FormattedTicks} from '../../../types';
import {ChartContext} from '../../ChartContainer';
import {getLongestTickWidth} from '../utilities';

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
