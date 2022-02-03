import React, {useState} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {getRoundedRectPath} from '../../../../../../utilities';
import type {
  FormattedStackedSeries,
  StackedBarGapDirections,
} from '../../../../../../types';
import {
  getRoundedBorderForStackedValues,
  getYPosition,
} from '../../../../utilities';
import {getGradientDefId} from '../../../../../../components/shared';
import {
  getColorBlindEventAttrs,
  getOpacityForActive,
} from '../../../../../../hooks';
import {STACKED_BAR_GAP} from '../../../../../../constants';

import styles from './Stack.scss';

interface StackProps {
  data: FormattedStackedSeries;
  gaps: {[key: number]: StackedBarGapDirections};
  groupIndex: number;
  id: string;
  width: number;
  x: number | undefined;
  yScale: ScaleLinear<number, number>;
  theme?: string;
}

export function Stack({
  data,
  gaps,
  groupIndex,
  id,
  theme,
  width,
  x,
  yScale,
}: StackProps) {
  const [activeBarIndex, setActiveBarIndex] = useState(-1);
  const keys = data[0] ? Object.keys(data[0].data) : [];

  const onMouseLeave = () => setActiveBarIndex(-1);

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
          roundedBorder: getRoundedBorderForStackedValues(values, index),
        });

        const y = getYPosition({
          start,
          end,
          groupIndex: index,
          gaps: gaps[groupIndex],
          yScale,
        });

        const onMouseOver = () => setActiveBarIndex(index);

        return (
          <g key={`${groupIndex}-${index}`} aria-hidden="true">
            <path
              fill={`url(#${getGradientDefId(theme, index, id)})`}
              d={pathD}
              key={index}
              transform={`translate(${x},${y})`}
              style={{
                opacity: getOpacityForActive({
                  activeIndex: activeBarIndex,
                  index,
                }),
              }}
              aria-hidden="true"
            />
            <rect
              className={styles.Bar}
              fill="transparent"
              height={height + STACKED_BAR_GAP}
              width={width}
              transform={`translate(${x},${y})`}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
              {...getColorBlindEventAttrs({
                type: 'singleItem',
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
