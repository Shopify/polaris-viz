import {borderRadiusStringToObject} from './borderRadiusStringToObject';
import {clamp} from './clamp';

export function keepValuePositive(amount: number): number {
  return Math.abs(clamp({amount, min: 0}));
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

  let {topLeft, topRight, bottomRight, bottomLeft} =
    borderRadiusStringToObject(borderRadius);

  const smallestSize = Math.min(height, width);

  topLeft = Math.min(topLeft, smallestSize / 2);
  topRight = Math.min(topRight, smallestSize / 2);
  bottomRight = Math.min(bottomRight, smallestSize / 2);
  bottomLeft = Math.min(bottomLeft, smallestSize / 2);

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
