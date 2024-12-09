import {useSpring, animated, to} from '@react-spring/web';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

const ANIMATION_DELAY = 150;

interface ConnectorProps {
  drawableHeight: number;
  fill: string;
  height: number;
  index: number;
  nextX: number;
  nextY: number;
  startX: number;
  startY: number;
}

export function FunnelConnector({
  drawableHeight,
  fill,
  height,
  index,
  nextX,
  nextY,
  startX,
  startY,
}: ConnectorProps) {
  const springConfig = useBarSpringConfig({
    animationDelay: index * ANIMATION_DELAY,
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
      fill={fill}
    />
  );
}
