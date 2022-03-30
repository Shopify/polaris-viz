// TODO: Move this into common
import {useMemo} from 'react';

import {yAxisMinMax} from '../../LineChart/utilities';
import {useYScale} from '../../../hooks';
import {getStackedMinMax} from '../../../utilities';
import type {MixedChartDataSeries} from '../types';

interface Props {
  data: MixedChartDataSeries[];
  drawableHeight: number;
}

interface MinMaxes {
  min: number;
  max: number;
  areAllNegative: boolean;
  areSomeNegative: boolean;
  index: number;
}

export function useDualAxisTicks({data, drawableHeight}: Props) {
  const minMaxes = useMemo(() => {
    return data.map((series, index) => {
      let min;
      let max;

      switch (series.shape) {
        case 'Line': {
          const [yMin, yMax] = yAxisMinMax({
            data: series.series,
            integersOnly: false,
            // integersOnly: yAxisOptions.integersOnly,
          });

          min = yMin;
          max = yMax;
          break;
        }
        case 'Bar': {
          const {min: yMin, max: yMax} = getStackedMinMax({
            stackedValues: null,
            data: series.series,
            integersOnly: false,
            // integersOnly: yAxisOptions.integersOnly,
          });

          min = yMin;
          max = yMax;
          break;
        }
      }

      const areAllNegative = min < 0 && max < 0;
      const areSomeNegative = min < 0 || max < 0;

      return {min, max, areAllNegative, areSomeNegative, index};
    });
  }, [data]);

  console.log({minMaxes});

  const areAllNegative = minMaxes.some(({areAllNegative}) => areAllNegative);

  const sourceOfTruthIndex = getSourceTicksIndex({minMaxes, areAllNegative});

  console.log({sourceOfTruthIndex});

  // const primaryAxis = minMaxes.splice(sourceOfTruthIndex, 1)[0];
  // const secondaryAxis = minMaxes[0];

  const primaryAxis = minMaxes[sourceOfTruthIndex === 0 ? 0 : 1];
  const secondaryAxis = minMaxes[sourceOfTruthIndex === 0 ? 1 : 0];

  const {ticks, yScale} = useYScale({
    drawableHeight,
    formatYAxisLabel: (value) => `${value}`,
    integersOnly: false,
    max: primaryAxis.max,
    min: primaryAxis.min,
    minLabelSpace: 0,
  });

  const ticksLength = ticks.length - 1;

  const zeroIndex = areAllNegative
    ? ticksLength
    : ticks.findIndex(({value}) => value === 0);

  const ticksBetweenZeroAndMAx = areAllNegative
    ? ticksLength
    : ticksLength - zeroIndex;

  const secondaryMax = Math.abs(
    areAllNegative ? secondaryAxis.min : secondaryAxis.max,
  );

  const tickHeight = Math.abs(secondaryMax / ticksBetweenZeroAndMAx);

  const secondaryTicks = ticks.map((tick, index) => {
    const alteredIndex = index - zeroIndex;

    return {
      value: tickHeight * alteredIndex,
      // TOOD: Format this
      formattedValue: `${tickHeight * alteredIndex}`,
      yOffset: yScale(tick.value),
    };
  });

  const leftTicks = sourceOfTruthIndex === 0 ? ticks : secondaryTicks;
  const rightTicks = sourceOfTruthIndex === 0 ? secondaryTicks : ticks;

  return {leftTicks, rightTicks};
}

function getSourceTicksIndex({
  minMaxes,
  areAllNegative,
}: {
  minMaxes: MinMaxes[];
  areAllNegative: boolean;
}) {
  const areBothNegative = minMaxes.every(
    ({areSomeNegative}) => areSomeNegative,
  );

  // If all the values are negative, or both sets contain
  // negative values, find the index with the biggest difference.
  if (areAllNegative || areBothNegative) {
    const {index: indexWithBiggestDifference} = minMaxes.reduce((prev, cur) => {
      const prevDiff = Math.abs(prev.max - prev.min);
      const curDiff = Math.abs(cur.max - cur.min);

      return prevDiff > curDiff ? prev : cur;
    });

    return indexWithBiggestDifference;
  }

  // Otherwise find the index that has negative values.
  const indexWithNegative = minMaxes.findIndex(
    ({areSomeNegative}) => areSomeNegative,
  );

  return indexWithNegative === -1 ? 0 : indexWithNegative;
}
