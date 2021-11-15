import {
  DEFAULT_BORDER_RADIUS,
  MIN_BAR_HEIGHT,
  MIN_WIDTH_BORDER_RADIUS,
} from '../constants';
import {RoundedBorder} from '../types';

import {clamp} from './clamp';

type RoundedCorners = [number, number, number, number];

interface Borders {
  [RoundedBorder.None]: RoundedCorners;
  [RoundedBorder.Top]: RoundedCorners;
  [RoundedBorder.Right]: RoundedCorners;
  [RoundedBorder.Bottom]: RoundedCorners;
  [RoundedBorder.Left]: RoundedCorners;
}

function keepValuePositive(amount: number): number {
  return clamp({amount, min: 0, max: Infinity});
}

function getBorderRadius(
  roundedCorner: RoundedBorder,
  radius: number,
): RoundedCorners {
  const borders: Borders = {
    [RoundedBorder.None]: [0, 0, 0, 0],
    [RoundedBorder.Top]: [radius, radius, 0, 0],
    [RoundedBorder.Right]: [0, radius, radius, 0],
    [RoundedBorder.Bottom]: [0, 0, radius, radius],
    [RoundedBorder.Left]: [radius, 0, 0, radius],
  };

  return borders[roundedCorner];
}

interface Props {
  height: number;
  width: number;
  roundedBorder: RoundedBorder;
  needsMinWidth: boolean;
}

export function getRoundedRectPath({
  height,
  width,
  roundedBorder,
  needsMinWidth,
}: Props) {
  if (height == null || width == null) {
    return '';
  }

  // Return a basic rect if the rounded arcs
  // would make the rect bigger than the min size.
  if (!needsMinWidth && (height < MIN_BAR_HEIGHT || width < MIN_BAR_HEIGHT)) {
    return `m 0 0 h ${width} v ${height} h -${width} z`;
  }

  const [topLeft, topRight, bottomRight, bottomLeft] = getBorderRadius(
    roundedBorder,
    needsMinWidth ? MIN_WIDTH_BORDER_RADIUS : DEFAULT_BORDER_RADIUS,
  );

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
