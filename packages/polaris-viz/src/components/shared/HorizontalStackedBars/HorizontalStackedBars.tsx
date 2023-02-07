import { Fragment, useMemo, useState } from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  COLOR_VISION_SINGLE_ITEM,
  BORDER_RADIUS,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../../hooks';
import {getBarId} from '../../../utilities';
import {HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../constants';
import type {FormattedStackedSeries} from '../../../types';
import {getGradientDefId} from '..';
import {ZeroValueLine} from '../ZeroValueLine';

import {StackedBar} from './components';
import {useStackedGaps} from './hooks';
import {getXPosition} from './utilities';

export interface HorizontalStackedBarsProps {
  activeGroupIndex: number;
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  dataKeys: string[];
  groupIndex: number;
  id: string;
  name: string;
  stackedValues: FormattedStackedSeries[];
  xScale: ScaleLinear<number, number>;
}

function getBorderRadius({
  lastIndexes,
  seriesIndex,
}: {
  lastIndexes: number[];
  seriesIndex: number;
}) {
  const [positive, negative] = lastIndexes;

  if (positive === seriesIndex) {
    return BORDER_RADIUS.Right;
  }

  if (negative === seriesIndex) {
    return BORDER_RADIUS.Left;
  }

  return BORDER_RADIUS.None;
}

export function HorizontalStackedBars({
  activeGroupIndex,
  animationDelay,
  barHeight,
  dataKeys,
  groupIndex,
  id,
  name,
  stackedValues,
  xScale,
}: HorizontalStackedBarsProps) {
  const {theme} = useChartContext();
  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (activeGroupIndex === -1 || activeGroupIndex === groupIndex) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  const lastIndexes = useMemo(() => {
    let lastPos = -1;
    let lastNeg = -1;

    stackedValues[groupIndex].forEach(([start, end], index) => {
      if (start < 0) {
        lastNeg = index;
      }

      if (end > 0) {
        lastPos = index;
      }
    });

    return [lastPos, lastNeg];
  }, [groupIndex, stackedValues]);

  const gaps = useStackedGaps({stackedValues, groupIndex});

  return (
    <g
      style={{
        transform: `translate(0, ${HORIZONTAL_GROUP_LABEL_HEIGHT}px`,
      }}
      aria-hidden="true"
    >
      {stackedValues[groupIndex].map((item, seriesIndex) => {
        const [start, end] = item;

        const barId = getBarId(id, groupIndex, seriesIndex);
        const width = Math.abs(xScale(end) - xScale(start));
        const borderRadius = getBorderRadius({
          lastIndexes,
          seriesIndex,
        });

        const x = getXPosition({start, end, seriesIndex, gaps, xScale});
        const key = dataKeys[seriesIndex] ?? '';
        const ariaLabel = `${key} ${end}`;

        const areAllValuesZero = stackedValues[groupIndex].every(
          ([start, end]) => start + end === 0,
        );

        return (
          <Fragment key={`stackedBar ${barId}`}>
            {areAllValuesZero ? (
              <ZeroValueLine x={x} y={barHeight / 2} direction="horizontal" />
            ) : (
              <StackedBar
                animationDelay={animationDelay}
                activeBarIndex={activeBarIndex}
                ariaLabel={ariaLabel}
                borderRadius={borderRadius}
                color={getGradientDefId(theme, seriesIndex, id)}
                height={barHeight}
                key={`${name}${barId}`}
                seriesIndex={seriesIndex}
                setActiveBarIndex={setActiveBarIndex}
                width={width}
                x={x}
                zeroPosition={xScale(0)}
              />
            )}
          </Fragment>
        );
      })}
    </g>
  );
}
