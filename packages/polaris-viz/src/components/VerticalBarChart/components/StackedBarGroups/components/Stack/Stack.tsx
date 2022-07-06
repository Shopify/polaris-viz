import React, {useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  getRoundedRectPath,
  useChartContext,
} from '@shopify/polaris-viz-core';

import type {
  FormattedStackedSeries,
  StackedBarGapDirections,
} from '../../../../../../types';
import {
  getBorderRadiusForStackedValues,
  getYPosition,
} from '../../../../utilities';
import {getGradientDefId} from '../../../../../../components/shared';
import {useWatchColorVisionEvents} from '../../../../../../hooks';
import {STACKED_BAR_GAP} from '../../../../../../constants';

import styles from './Stack.scss';

interface StackProps {
  activeBarGroup: number;
  data: FormattedStackedSeries;
  gaps: {[key: number]: StackedBarGapDirections};
  groupIndex: number;
  id: string;
  width: number;
  x: number | undefined;
  yScale: ScaleLinear<number, number>;
}

export function Stack({
  activeBarGroup,
  data,
  gaps,
  groupIndex,
  id,
  width,
  x,
  yScale,
}: StackProps) {
  const [activeBarIndex, setActiveBarIndex] = useState(-1);
  const {theme} = useChartContext();

  const keys = data[0] ? Object.keys(data[0].data) : [];

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (
        detail.index === -1 ||
        activeBarGroup === -1 ||
        activeBarGroup === groupIndex
      ) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  return (
    <React.Fragment>
      {data.map((data, index) => {
        const [start, end] = data;

        const height = Math.abs(yScale(end) - yScale(start));
        const values = data.data ? Object.values(data.data) : [];
        const ariaLabel = `${keys[index]} ${values[index]}`;

        const pathD = getRoundedRectPath({
          height,
          width,
          needsMinWidth: false,
          borderRadius: getBorderRadiusForStackedValues(values, index),
        });

        const y = getYPosition({
          start,
          end,
          groupIndex: index,
          gaps: gaps[groupIndex],
          yScale,
        });

        return (
          <g key={`${groupIndex}-${index}`} aria-hidden="true">
            <path
              fill={`url(#${getGradientDefId(theme, index, id)})`}
              d={pathD}
              key={index}
              transform={`translate(${x},${y})`}
              style={getColorVisionStylesForActiveIndex({
                activeIndex: activeBarIndex,
                index,
              })}
              aria-hidden="true"
            />
            <rect
              className={styles.Bar}
              fill="transparent"
              height={height + STACKED_BAR_GAP}
              width={width}
              transform={`translate(${x},${y})`}
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index,
              })}
              tabIndex={-1}
              role="listitem"
              aria-label={ariaLabel}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
