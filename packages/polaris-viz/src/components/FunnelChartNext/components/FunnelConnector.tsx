import {Fragment, useState} from 'react';
import {useSpring, animated} from '@react-spring/web';
import {FONT_SIZE} from '@shopify/polaris-viz-core';

import {FunnelChartConnector} from '../../shared';
import {estimateStringWidthWithOffset} from '../../../utilities';
import {SingleTextLine} from '../../Labels';
import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';
import {FUNNEL_CONNECTOR_Y_OFFSET} from '../constants';

const ANIMATION_DELAY = 150;
const TEXT_HEIGHT = 10;
const TEXT_PADDING = 4;

interface ConnectorProps {
  drawableHeight: number;
  height: number;
  index: number;
  nextX: number;
  nextY: number;
  percentCalculation: string;
  startX: number;
  startY: number;
  width: number;
}

export function FunnelConnector({
  height,
  nextX,
  nextY,
  startX,
  startY,
  width,
  drawableHeight,
  index,
  percentCalculation,
}: ConnectorProps) {
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = useBarSpringConfig({
    animationDelay: index * ANIMATION_DELAY,
  });

  const textWidth = estimateStringWidthWithOffset(
    percentCalculation,
    FONT_SIZE,
    300,
  );

  const pillX = startX + width / 2 - textWidth / 2 - TEXT_PADDING;

  const yOffset = isHovering ? FUNNEL_CONNECTOR_Y_OFFSET : 0;

  const {pillTransform, pillOpacity} = useSpring({
    pillTransform: `translate(${pillX}px, ${startY - yOffset}px)`,
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

      <FunnelChartConnector
        drawableHeight={drawableHeight}
        height={height}
        index={index}
        nextX={nextX}
        nextY={nextY}
        startX={startX}
        startY={startY}
      />

      <rect
        height={height + FUNNEL_CONNECTOR_Y_OFFSET}
        width={width}
        x={startX}
        y={startY - FUNNEL_CONNECTOR_Y_OFFSET}
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
