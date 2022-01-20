import React from 'react';

import {getRoundedRectPath} from '../../../../../../utilities';
import {DataType} from '../../../../../../types';
import {
  formatAriaLabel,
  getRoundedBorderForStackedValues,
} from '../../../../utilities';
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
      {data.map((data, barIndex) => {
        const [start, end] = data;
        const xPosition = xScale(barIndex.toString());

        const ariaLabel = formatAriaLabel(accessibilityData[barIndex]);
        const height = Math.abs(yScale(end) - yScale(start));
        const ariaEnabledBar = groupIndex === 0 && !ariaHidden;
        const isActive = activeBarGroup != null && barIndex === activeBarGroup;

        const values = data.data ? Object.values(data.data) : [];

        const pathD = getRoundedRectPath({
          height,
          width: barWidth,
          needsMinWidth: false,
          roundedBorder: getRoundedBorderForStackedValues(values, groupIndex),
        });

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
            <path
              d={pathD}
              id={isActive ? activeBarId : ''}
              key={barIndex}
              transform={`translate(${xPosition},${yScale(end)})`}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
