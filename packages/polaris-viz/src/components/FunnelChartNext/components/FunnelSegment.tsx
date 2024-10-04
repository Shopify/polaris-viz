import {Fragment, useRef} from 'react';
import {useSpring, animated} from '@react-spring/web';
import {getRoundedRectPath} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

import type {Connector} from './FunnelConnector';
import {FunnelConnector} from './FunnelConnector';

const BORDER_RADIUS = 6;

export interface Props {
  ariaLabel: string;
  barHeight: number;
  barWidth: number;
  color: string;
  connector: Connector;
  drawableHeight: number;
  index: number;
  isLast: boolean;
  percentCalculation: string;
  x: number;
}

export function FunnelSegment({
  ariaLabel,
  barHeight,
  barWidth,
  color,
  connector,
  drawableHeight,
  index = 0,
  isLast,
  percentCalculation,
  x,
}: Props) {
  const mounted = useRef(false);

  const springConfig = useBarSpringConfig({animationDelay: index * 150});
  const isFirst = index === 0;

  const {animatedHeight} = useSpring({
    from: {
      animatedHeight: mounted.current ? barHeight : 0,
    },
    to: {
      animatedHeight: barHeight,
    },
    ...springConfig,
  });

  return (
    <Fragment>
      <animated.path
        aria-label={ariaLabel}
        fill={color}
        width={barWidth}
        d={animatedHeight.to((value: number) =>
          getRoundedRectPath({
            height: value,
            width: barWidth,
            borderRadius: `${isFirst ? BORDER_RADIUS : 0} ${
              isLast ? BORDER_RADIUS : 0
            } 0 0`,
          }),
        )}
        style={{
          transform: animatedHeight.to(
            (value: number) => `translate(${x}px, ${drawableHeight - value}px)`,
          ),
        }}
      />
      {!isLast && (
        <FunnelConnector
          connector={connector}
          drawableHeight={drawableHeight}
          index={index}
          percentCalculation={percentCalculation}
        />
      )}
    </Fragment>
  );
}
