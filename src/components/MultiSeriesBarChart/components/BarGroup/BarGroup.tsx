import React, {useCallback} from 'react';
import {ScaleLinear} from 'd3-scale';
import {Color} from 'types';
import {useTransition} from 'react-spring';

import {usePrefersReducedMotion} from '../../../../hooks';
import {Bar} from '../../../Bar';
import {BAR_SPACING} from '../../constants';
import {MIN_BAR_HEIGHT, BARS_TRANSITION_CONFIG} from '../../../../constants';
import {getAnimationTrail} from '../../../../utilities';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  data: number[];
  colors: Color[];
  highlightColors: Color[];
  isActive: boolean;
  barGroupIndex: number;
  ariaLabel: string;
  onFocus: (index: number) => void;
  hasRoundedCorners: boolean;
  isAnimated?: boolean;
}

export function BarGroup({
  x,
  data,
  yScale,
  width,
  colors,
  isActive,
  highlightColors,
  onFocus,
  barGroupIndex,
  ariaLabel,
  hasRoundedCorners,
  isAnimated = false,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const barWidth = width / data.length - BAR_SPACING;

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
      const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;
      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [yScale],
  );

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const transitions = useTransition(data, (dataPoint) => dataPoint, {
    from: {height: 0},
    leave: {height: 0},
    enter: (rawValue) => ({height: getBarHeight(rawValue)}),
    update: (rawValue) => ({height: getBarHeight(rawValue)}),
    immediate: !shouldAnimate,
    trail: shouldAnimate ? getAnimationTrail(data.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  return (
    <React.Fragment>
      {transitions.map(({item: value, props: {height}}, index) => {
        const handleFocus = () => {
          onFocus(barGroupIndex);
        };

        const ariaEnabledBar = index === 0;
        return (
          <g
            role={index === 0 ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={index}
          >
            {/* <Bar
              height={height}
              color={colors[index]}
              // highlightColor={highlightColors[index]}
              isSelected={isActive}
              x={x + (barWidth + BAR_SPACING) * index}
              yScale={yScale}
              rawValue={value}
              width={barWidth}
              index={index}
              onFocus={handleFocus}
              tabIndex={ariaEnabledBar ? 0 : -1}
              role={ariaEnabledBar ? 'img' : undefined}
              ariaLabel={ariaEnabledBar ? ariaLabel : undefined}
              hasRoundedCorners={hasRoundedCorners}
            /> */}
          </g>
        );
      })}
    </React.Fragment>
  );
}
