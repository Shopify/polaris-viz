import {useMemo} from 'react';

import {FONT_SIZE} from '../../../constants';
import {getTextWidth} from '../../../utilities';
import {BAR_LABEL_OFFSET, FONT_SIZE_PADDING} from '../constants';
import type {LabelFormatter, Series} from '../types';

interface Props {
  series: Series[];
  isSimple: boolean;
  labelFormatter: LabelFormatter;
}

export function useDataForChart({labelFormatter, series, isSimple}: Props) {
  const allNumbers = useMemo(() => {
    return series.reduce<number[]>((prev, cur) => {
      const numbers = cur.data.map(({rawValue}) => rawValue);
      return prev.concat(...numbers);
    }, []);
  }, [series]);

  const longestLabel = useMemo(() => {
    if (!isSimple) {
      return 0;
    }

    return (
      allNumbers.reduce((prev, cur) => {
        if (`${cur}`.length > `${prev}`.length) {
          return getTextWidth({
            text: `${labelFormatter(cur)}`,
            fontSize: FONT_SIZE + FONT_SIZE_PADDING,
          });
        }

        return getTextWidth({
          text: `${labelFormatter(prev)}`,
          fontSize: FONT_SIZE + FONT_SIZE_PADDING,
        });
      }, 0) + BAR_LABEL_OFFSET
    );
  }, [allNumbers, labelFormatter, isSimple]);

  const areAllAllNegative = useMemo(() => {
    return !allNumbers.some((num) => num > 0);
  }, [allNumbers]);

  return {allNumbers, longestLabel, areAllAllNegative};
}
