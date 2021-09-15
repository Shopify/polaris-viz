import React from 'react';

import {formatAriaLabel} from 'components/MultiSeriesBarChart/utilities';
import {BAR_SPACING} from 'components/MultiSeriesBarChart/constants';
import type {StackedBarGroupProps} from 'components/MultiSeriesBarChart/components/StackedBarGroup/types';

export function Stack({
  data,
  xScale,
  onFocus,
  ariaHidden,
  activeBarId,
  accessibilityData,
  activeBarGroup,
  yScale,
  groupIndex,
}: Omit<StackedBarGroupProps, 'colors'> & {
  ariaHidden: boolean;
  activeBarId: string;
}) {
  const barWidth = xScale.bandwidth() - BAR_SPACING;
  return (
    <React.Fragment>
      {data.map(([start, end], barIndex) => {
        const xPosition = xScale(barIndex.toString());

        const handleFocus = () => {
          onFocus(barIndex);
        };

        const ariaLabel = formatAriaLabel(accessibilityData[barIndex]);
        const height = Math.abs(yScale(end) - yScale(start));
        const ariaEnabledBar = groupIndex === 0 && !ariaHidden;
        const isActive = activeBarGroup != null && barIndex === activeBarGroup;

        return (
          <g
            role={ariaEnabledBar ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={barIndex}
          >
            <rect
              id={isActive ? activeBarId : ''}
              key={barIndex}
              x={xPosition}
              y={yScale(end)}
              height={height}
              width={barWidth}
              tabIndex={ariaEnabledBar ? 0 : -1}
              onFocus={handleFocus}
              role={ariaEnabledBar ? 'img' : undefined}
              aria-label={ariaEnabledBar ? ariaLabel : undefined}
              aria-hidden={!ariaEnabledBar}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
