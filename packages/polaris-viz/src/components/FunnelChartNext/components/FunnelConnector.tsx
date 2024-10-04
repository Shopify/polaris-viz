import {Fragment, useState} from 'react';
import {useSpring, animated, to} from '@react-spring/web';
import type {DataPoint} from '@shopify/polaris-viz-core';
import {FONT_SIZE} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../../utilities';
import {SingleTextLine} from '../../Labels';
import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';
import {FUNNEL_CONNECTOR_Y_OFFSET} from '../constants';

const ANIMATION_DELAY = 150;
const TEXT_HEIGHT = 10;
const TEXT_PADDING = 4;

export interface Connector {
  fill: string;
  height: number;
  nextPoint: DataPoint;
  nextX: number;
  nextY: number;
  startX: number;
  startY: number;
  width: number;
}

interface ConnectorProps {
  connector: Connector;
  drawableHeight: number;
  index: number;
  percentCalculation: string;
}

export function FunnelConnector({
  connector,
  drawableHeight,
  index,
  percentCalculation,
}: ConnectorProps) {
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = useBarSpringConfig({
    animationDelay: index * ANIMATION_DELAY,
  });

  const {animatedStartY, animatedNextY} = useSpring({
    from: {
      animatedStartY: drawableHeight,
      animatedNextY: drawableHeight,
    },
    to: {
      animatedStartY: connector.startY,
      animatedNextY: connector.nextY,
    },
    ...springConfig,
  });

  const textWidth = estimateStringWidthWithOffset(
    percentCalculation,
    FONT_SIZE,
    300,
  );

  const pillX =
    connector.startX + connector.width / 2 - textWidth / 2 - TEXT_PADDING;

  const yOffset = isHovering ? FUNNEL_CONNECTOR_Y_OFFSET : 0;

  const {pillTransform, pillOpacity} = useSpring({
    pillTransform: `translate(${pillX}px, ${connector.startY - yOffset}px)`,
    pillOpacity: isHovering ? 1 : 0,
    ...springConfig,
  });

  const doubleTextPadding = TEXT_PADDING * 2;

  return (
    <Fragment>
      <animated.g
        style={{
          transform: pillTransform,
          opacity: pillOpacity,
        }}
      >
        <rect
          height={TEXT_HEIGHT + doubleTextPadding}
          width={textWidth + doubleTextPadding}
          fill="rgba(242, 245, 254, 1)"
          rx="4"
        />
        <SingleTextLine
          text={percentCalculation}
          targetWidth={textWidth + doubleTextPadding}
          color="rgba(16, 50, 149, 1)"
          x={TEXT_PADDING}
          y={TEXT_PADDING}
        />
      </animated.g>

      <animated.path
        d={to(
          [animatedStartY, animatedNextY],
          (startY, nextY) =>
            `M${connector.startX} ${startY}
         L ${connector.nextX} ${nextY}
         V ${connector.height} H ${connector.startX} Z`,
        )}
        fill={connector.fill}
      />
      <rect
        height={connector.height + FUNNEL_CONNECTOR_Y_OFFSET}
        width={connector.width}
        x={connector.startX}
        y={connector.startY - FUNNEL_CONNECTOR_Y_OFFSET}
        fill="transparent"
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        tabIndex={0}
      />
    </Fragment>
  );
}
