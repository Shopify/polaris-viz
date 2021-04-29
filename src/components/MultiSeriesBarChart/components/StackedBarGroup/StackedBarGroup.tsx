import React, {useMemo} from 'react';
import {ScaleLinear, ScaleBand} from 'd3-scale';
import {SeriesColor, Color, GradientStop} from 'types';

import {formatAriaLabel} from '../../utilities';
import {StackSeries} from '../../types';
import {BAR_SPACING} from '../../constants';
import {getColorValue, isGradientType, uniqueId} from '../../../../utilities';
import {MASK_SUBDUE_COLOR, MASK_HIGHLIGHT_COLOR} from '../../../../constants';
import {LinearGradient} from '../../../../components';

import styles from './StackedBarGroup.scss';

interface Props {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: SeriesColor[];
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
  onFocus,
  accessibilityData,
  activeBarGroup,
}: Props) {
  const maskId = useMemo(() => uniqueId('mask'), []);
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const activeBarId = useMemo(() => uniqueId('activeBar'), []);

  const hasActiveBar = activeBarGroup != null;

  const shouldUseGradient = isGradientType(colors[groupIndex]);

  const fillColor = useMemo(
    () =>
      shouldUseGradient
        ? colors[groupIndex]
        : getColorValue(colors[groupIndex] as Color),
    [colors, groupIndex, shouldUseGradient],
  );

  return (
    <React.Fragment>
      <defs aria-hidden role="none">
        {shouldUseGradient ? (
          <LinearGradient
            id={gradientId}
            gradient={fillColor as GradientStop[]}
          />
        ) : null}

        <mask id={maskId}>
          <g
            className={styles.TransitionColor}
            style={{
              fill: hasActiveBar ? MASK_SUBDUE_COLOR : MASK_HIGHLIGHT_COLOR,
            }}
          >
            <StackMarkup
              data={data}
              xScale={xScale}
              onFocus={onFocus}
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
          fill: shouldUseGradient ? `url(#${gradientId})` : fillColor,
        }}
      >
        <StackMarkup
          data={data}
          xScale={xScale}
          onFocus={onFocus}
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

function StackMarkup({
  data,
  xScale,
  onFocus,
  ariaHidden,
  activeBarId,
  accessibilityData,
  activeBarGroup,
  yScale,
  groupIndex,
}: Partial<Props> & {
  ariaHidden: boolean;
  activeBarId: string;
  barWidth: number;
}) {
  const barWidth = xScale.bandwidth() - BAR_SPACING;
  return data.map(([start, end], barIndex) => {
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
  });
}
