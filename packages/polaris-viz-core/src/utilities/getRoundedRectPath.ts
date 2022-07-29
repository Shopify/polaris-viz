import {borderRadiusStringToObject} from './borderRadiusStringToObject';
import {clamp} from './clamp';

export function keepValuePositive(amount: number): number {
  return clamp({amount, min: 0, max: Infinity});
}

interface Props {
  borderRadius: string;
  height: number;
  width: number;
}

export function getRoundedRectPath({borderRadius, height, width}: Props) {
  if (height == null || width == null) {
    return '';
  }

  const {topLeft, topRight, bottomRight, bottomLeft} =
    borderRadiusStringToObject(borderRadius);

  const minWidth = Math.max(topLeft + topRight, bottomLeft + bottomRight);
  const minHeight = Math.max(topLeft + bottomLeft, topRight + bottomRight);

  // Return a basic rect if the rounded arcs
  // would make the rect bigger than the min size.
  if (height < minHeight || width < minWidth) {
    return `m 0 0 h ${width} v ${height} h -${width} z`;
  }

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
