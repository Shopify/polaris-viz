import React from 'react';

import {DataType} from '../../../../../../types';
import {formatAriaLabel} from '../../../../utilities';
import {BAR_SPACING} from '../../../../constants';
import type {StackedBarGroupProps} from '../../types';

export function Stack({
  data,
  xScale,
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

        const ariaLabel = formatAriaLabel(accessibilityData[barIndex]);
        const height = Math.abs(yScale(end) - yScale(start));
        const ariaEnabledBar = groupIndex === 0 && !ariaHidden;
        const isActive = activeBarGroup != null && barIndex === activeBarGroup;

        return (
          <g
            role={ariaEnabledBar ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={barIndex}
            data-type={DataType.BarGroup}
            data-index={barIndex}
            tabIndex={ariaEnabledBar ? 0 : -1}
            aria-label={ariaEnabledBar ? ariaLabel : undefined}
          >
            <rect
              id={isActive ? activeBarId : ''}
              key={barIndex}
              x={xPosition}
              y={yScale(end)}
              height={height}
              width={barWidth}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
