import {LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';

import {useEstimateStringWidth} from '../../../../hooks/useEstimateStringWidth';
import {SingleTextLine} from '../../../Labels';

export interface AxisLabelProps {
  axis: 'primary' | 'secondary';
  height: number;
  name: string;
  x: number;
  y: number;
}

export function AxisLabel({height, name, axis, x, y}: AxisLabelProps) {
  const stringWidth = useEstimateStringWidth(name);
  const selectedTheme = useTheme();

  const rotate = axis === 'primary' ? -90 : 90;

  const yCenter = height / 2;
  const halfStringSize = stringWidth / 2;

  const yOffset = axis === 'primary' ? yCenter : yCenter - stringWidth;
  const xOffset = axis === 'primary' ? 0 : LINE_HEIGHT;

  return (
    <g
      transform={`translate(${x + xOffset},${
        y + yOffset + halfStringSize
      }) rotate(${rotate})`}
    >
      <rect
        width={stringWidth}
        height={LINE_HEIGHT}
        fill={selectedTheme.chartContainer.backgroundColor}
      />
      <SingleTextLine
        color={selectedTheme.yAxis.labelColor}
        targetWidth={Math.max(stringWidth, height)}
        text={name}
        x={0}
        y={0}
      />
    </g>
  );
}
