import {Fragment} from 'react';
import {FONT_SIZE} from '@shopify/polaris-viz-core';

import {FunnelChartConnector} from '../../shared';
import {estimateStringWidthWithOffset} from '../../../utilities';
import {SingleTextLine} from '../../Labels';
import {FUNNEL_CONNECTOR_Y_OFFSET} from '../constants';

const TEXT_HEIGHT = 10;
const TEXT_PADDING = 4;

interface ConnectorProps {
  drawableHeight: number;
  height: number;
  index: number;
  nextX: number;
  nextY: number;
  percentCalculation: string;
  showConnectionPercentage: boolean;
  startX: number;
  startY: number;
  width: number;
}

export function FunnelConnector({
  drawableHeight,
  height,
  index,
  nextX,
  nextY,
  percentCalculation,
  showConnectionPercentage,
  startX,
  startY,
  width,
}: ConnectorProps) {
  const textWidth = estimateStringWidthWithOffset(
    percentCalculation,
    FONT_SIZE,
    300,
  );

  const pillX = startX + width / 2 - textWidth / 2 - TEXT_PADDING;

  const doubleTextPadding = TEXT_PADDING * 2;

  return (
    <Fragment>
      {showConnectionPercentage && (
        <g
          style={{
            transform: `translate(${pillX}px, ${
              startY - FUNNEL_CONNECTOR_Y_OFFSET
            }px)`,
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
        </g>
      )}

      <FunnelChartConnector
        drawableHeight={drawableHeight}
        height={height}
        index={index}
        nextX={nextX}
        nextY={nextY}
        startX={startX}
        startY={startY}
      />
    </Fragment>
  );
}
