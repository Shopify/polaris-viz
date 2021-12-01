import React, {useMemo} from 'react';

import type {GradientStop} from '../../../../types';
import {isGradientType, uniqueId} from '../../../../utilities';
import {MASK_SUBDUE_COLOR, MASK_HIGHLIGHT_COLOR} from '../../../../constants';
import {LinearGradient} from '../../../LinearGradient';

import {Stack} from './components';
import styles from './StackedBarGroup.scss';
import type {StackedBarGroupProps} from './types';

export function StackedBarGroup({
  groupIndex,
  data,
  yScale,
  xScale,
  colors,
  accessibilityData,
  activeBarGroup,
}: StackedBarGroupProps) {
  const maskId = useMemo(() => uniqueId('mask'), []);
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const activeBarId = useMemo(() => uniqueId('activeBar'), []);

  const hasActiveBar = activeBarGroup != null;
  const lookedUpColor = colors[groupIndex];
  const shouldUseGradient = isGradientType(lookedUpColor);

  const fillColor = shouldUseGradient
    ? `url(#${gradientId})`
    : (lookedUpColor as string);

  return (
    <React.Fragment>
      <defs aria-hidden role="none">
        {shouldUseGradient ? (
          <LinearGradient
            id={gradientId}
            gradient={lookedUpColor as GradientStop[]}
          />
        ) : null}

        <mask id={maskId}>
          <g
            className={styles.TransitionColor}
            style={{
              fill: hasActiveBar ? MASK_SUBDUE_COLOR : MASK_HIGHLIGHT_COLOR,
            }}
          >
            <Stack
              data={data}
              xScale={xScale}
              ariaHidden
              activeBarId={activeBarId}
              accessibilityData={accessibilityData}
              activeBarGroup={activeBarGroup}
              yScale={yScale}
              groupIndex={groupIndex}
            />
          </g>
          <use
            className={styles.TransitionColor}
            style={{
              fill: MASK_HIGHLIGHT_COLOR,
            }}
            href={`#${activeBarId}`}
          />
        </mask>
      </defs>
      <g
        mask={`url(#${maskId})`}
        style={{
          fill: fillColor,
        }}
        role="list"
      >
        <Stack
          data={data}
          xScale={xScale}
          ariaHidden={false}
          activeBarId={activeBarId}
          accessibilityData={accessibilityData}
          activeBarGroup={activeBarGroup}
          yScale={yScale}
          groupIndex={groupIndex}
        />
      </g>
    </React.Fragment>
  );
}
