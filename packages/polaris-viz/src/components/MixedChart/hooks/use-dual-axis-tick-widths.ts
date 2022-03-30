import {useContext, useMemo} from 'react';

import {estimateStringWidth} from '../../../utilities';
import type {CharacterWidths, FormattedTicks} from '../../../types';
import {ChartContext} from '../../ChartContainer';

export function useDualAxisTicksWidth(leftTicks, rightTicks) {
  const {characterWidths} = useContext(ChartContext);

  return useMemo(() => {
    return {
      leftTickWidth: getLongestWidth(leftTicks, characterWidths),
      rightTickWidth: getLongestWidth(rightTicks, characterWidths),
    };
  }, [leftTicks, rightTicks, characterWidths]);
}

function getLongestWidth(
  ticks: FormattedTicks[],
  characterWidths: CharacterWidths,
) {
  return ticks.reduce((prev, cur) => {
    const width = estimateStringWidth(cur.formattedValue, characterWidths);

    if (width > prev) {
      return width;
    }

    return prev;
  }, 0);
}
