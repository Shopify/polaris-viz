import {useSpring, animated, to} from '@react-spring/web';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

import {FUNNEL_CHART_CONNECTOR_GRADIENT_ID} from './constants';

const ANIMATION_DELAY = 150;

interface ConnectorProps {
  drawableHeight: number;
  height: number;
  index: number;
  nextX: number;
  nextY: number;
  startX: number;
  startY: number;
}

export function FunnelChartConnector({
  drawableHeight,
  height,
  index,
  nextX,
  nextY,
  startX,
  startY,
}: ConnectorProps) {
  const springConfig = useBarSpringConfig({
    animationDelay: (index || 1) * ANIMATION_DELAY,
  });

  const {animatedStartY, animatedNextY} = useSpring({
    from: {
      animatedStartY: drawableHeight,
      animatedNextY: drawableHeight,
    },
    to: {
      animatedStartY: startY,
      animatedNextY: nextY,
    },
    ...springConfig,
  });

  return (
    <animated.path
      d={to(
        [animatedStartY, animatedNextY],
        (startY, nextY) =>
          `M${startX} ${startY}
     L ${nextX} ${nextY}
     V ${height} H ${startX} Z`,
      )}
      fill={`url(#${FUNNEL_CHART_CONNECTOR_GRADIENT_ID})`}
    />
  );
}
