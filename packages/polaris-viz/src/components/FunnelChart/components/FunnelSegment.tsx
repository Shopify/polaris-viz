import React, {useRef} from 'react';
import {createPortal} from 'react-dom';
import {useSpring, animated, to} from '@react-spring/web';
import {
  getRoundedRectPath,
  BARS_LOAD_ANIMATION_CONFIG,
  useChartContext,
  changeColorOpacity,
  useTheme,
} from '@shopify/polaris-viz-core';

import {Label} from './Label';

const Y_AXIS_LABEL_VERTICAL_OFFSET = 32;
const PERCENT_LABEL_VERTICAL_OFFSET = 24;

export function FunnelSegment({
  barWidth,
  barHeight,
  drawableHeight,
  x,
  borderRadius,
  ariaLabel,
  index = 0,
  color,
  connector,
  isLast,
  portalTo,
  percentLabel,
  formattedYValue,
}) {
  const mounted = useRef(false);
  const {shouldAnimate} = useChartContext();

  const {
    xAxis: {labelColor: axisLabelColor},
    chartContainer: {backgroundColor},
  } = useTheme();

  const {animatedHeight, animatedStartY, animatedNextY} = useSpring({
    from: {
      animatedHeight: mounted.current ? barHeight : 0,
      animatedStartY: drawableHeight,
      animatedNextY: drawableHeight,
    },
    to: {
      animatedHeight: barHeight,
      animatedStartY: connector.startY,
      animatedNextY: connector.nextY,
    },
    delay: mounted.current ? 0 : index * 150,
    config: BARS_LOAD_ANIMATION_CONFIG,
    default: {immediate: !shouldAnimate},
    onRest: () => (mounted.current = true),
  });

  return (
    <React.Fragment>
      {createPortal(
        <animated.path
          aria-label={ariaLabel}
          fill={color}
          width={barWidth}
          d={animatedHeight.to((value: number) =>
            getRoundedRectPath({
              height: value,
              width: barWidth,
              borderRadius: `${borderRadius} ${borderRadius} 0 0`,
            }),
          )}
          style={{
            transform: animatedHeight.to(
              (value: number) =>
                `translate(${x}px, ${drawableHeight - value}px)`,
            ),
          }}
        />,
        portalTo,
      )}
      {!isLast && (
        <animated.path
          d={to(
            [animatedStartY, animatedNextY, animatedHeight],
            (startY, nextY) =>
              `M${connector.startX} ${startY}
               L ${connector.nextX} ${nextY}
               V ${connector.height} H ${connector.startX} Z`,
          )}
          fill={connector.fill}
        />
      )}

      <Label
        transform={animatedStartY.to(
          (value: number) =>
            `translate(${x}px, ${value - Y_AXIS_LABEL_VERTICAL_OFFSET}px)`,
        )}
        label={formattedYValue}
        labelWidth={barWidth}
        size="large"
        color={axisLabelColor}
      />
      <Label
        backgroundColor={backgroundColor}
        label={percentLabel}
        labelWidth={barWidth}
        transform={animatedNextY.to(
          (value: number) =>
            `translate(${Number(x) + Number(barWidth)}px, ${
              value - PERCENT_LABEL_VERTICAL_OFFSET
            }px)`,
        )}
        size="small"
        color={changeColorOpacity(axisLabelColor, 0.7)}
      />
    </React.Fragment>
  );
}
