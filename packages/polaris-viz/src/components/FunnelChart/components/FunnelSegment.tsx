import { Fragment, useRef } from 'react';
import {createPortal} from 'react-dom';
import {useSpring, animated, to} from '@react-spring/web';
import {
  getRoundedRectPath,
  changeColorOpacity,
  useTheme,
} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

import {Label} from './Label';

const Y_AXIS_LABEL_VERTICAL_OFFSET = 32;
const PERCENT_LABEL_VERTICAL_OFFSET = 24;

export function FunnelSegment({
  barWidth,
  barHeight,
  drawableHeight,
  x,
  ariaLabel,
  index = 0,
  color,
  connector,
  isLast,
  portalTo,
  percentLabel,
  formattedYValue,
}) {
  const selectedTheme = useTheme();
  const mounted = useRef(false);

  const borderRadius = selectedTheme.bar.borderRadius;

  const {
    xAxis: {labelColor: axisLabelColor},
    chartContainer: {backgroundColor},
  } = useTheme();

  const springConfig = useBarSpringConfig({animationDelay: index * 150});

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
    ...springConfig,
  });

  return (
    <Fragment>
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
    </Fragment>
  );
}
