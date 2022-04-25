import {MIN_BAR_HEIGHT} from '../constants';

import {borderRadiusStringToObject} from './borderRadiusStringToObject';
import {clamp} from './clamp';

export function keepValuePositive(amount: number): number {
  return clamp({amount, min: 0, max: Infinity});
}

interface Props {
  borderRadius: string;
  height: number;
  width: number;
  needsMinWidth?: boolean;
}

export function getRoundedRectPath({
  borderRadius,
  height,
  needsMinWidth = false,
  width,
}: Props) {
  if (height == null || width == null) {
    return '';
  }

  // Return a basic rect if the rounded arcs
  // would make the rect bigger than the min size.
  if (!needsMinWidth && (height < MIN_BAR_HEIGHT || width < MIN_BAR_HEIGHT)) {
    return `m 0 0 h ${width} v ${height} h -${width} z`;
  }

  const {topLeft, topRight, bottomRight, bottomLeft} =
    borderRadiusStringToObject(borderRadius);

  const top = topLeft + topRight;
  const right = topRight + bottomRight;
  const bottom = bottomRight + bottomLeft;
  const left = bottomLeft + topLeft;

  return `
  M${topLeft},0
  h${keepValuePositive(width - top)}
  a${topRight},${topRight} 0 0 1 ${topRight},${topRight}
  v${keepValuePositive(height - right)}
  a${bottomRight},${bottomRight} 0 0 1 -${bottomRight},${bottomRight}
  h-${keepValuePositive(width - bottom)}
  a${bottomLeft},${bottomLeft} 0 0 1 -${bottomLeft},-${bottomLeft}
  v-${keepValuePositive(height - left)}
  a${topLeft},${topLeft} 0 0 1 ${topLeft},-${topLeft}
  Z
`;
}
