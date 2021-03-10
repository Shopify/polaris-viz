import React from 'react';
import {ScaleLinear, ScaleBand} from 'd3-scale';
import {Color} from 'types';

import {formatAriaLabel} from '../../utilities';
import {StackSeries} from '../../types';
import {BAR_SPACING} from '../../constants';
import {getColorValue} from '../../../../utilities';
import styles from '../../shared.scss';

interface Props {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: Color[];
  highlightColors: Color[];
  activeBarGroup: number | null;
  accessibilityData: {
    title: string;
    data: {
      label: string;
      value: string;
    }[];
  }[];
  onFocus: (index: number) => void;
}

export function StackedBarGroup({
  groupIndex,
  data,
  yScale,
  xScale,
  colors,
  highlightColors,
  activeBarGroup,
  onFocus,
  accessibilityData,
}: Props) {
  const barWidth = xScale.bandwidth() - BAR_SPACING;

  return (
    <g>
      {data.map(([start, end], barIndex) => {
        const xPosition = xScale(barIndex.toString());

        const fillColor =
          activeBarGroup === barIndex
            ? getColorValue(highlightColors[groupIndex])
            : getColorValue(colors[groupIndex]);

        const handleFocus = () => {
          onFocus(barIndex);
        };

        const ariaLabel = formatAriaLabel(accessibilityData[barIndex]);
        const height = Math.abs(yScale(end) - yScale(start));

        const ariaEnabledBar = groupIndex === 0;

        return (
          <g
            role={groupIndex === 0 ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={barIndex}
          >
            <rect
              className={styles.Bar}
              key={barIndex}
              x={xPosition}
              y={yScale(end)}
              height={height}
              width={barWidth}
              fill={fillColor}
              tabIndex={ariaEnabledBar ? 0 : -1}
              onFocus={handleFocus}
              role={ariaEnabledBar ? 'img' : undefined}
              aria-label={ariaEnabledBar ? ariaLabel : undefined}
            />
          </g>
        );
      })}
    </g>
  );
}
