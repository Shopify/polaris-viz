import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color, ActiveTooltip} from 'types';

import {getColorValue} from '../../utilities';

interface Props {
  active: boolean;
  cx: number;
  cy: number;
  color: Color;
  index: number;
  onFocus?: ({index, x, y}: ActiveTooltip) => void;
  tabIndex?: number;
  ariaLabelledby?: string;
}

export const Point = React.memo(function Point({
  cx,
  cy,
  active,
  color,
  onFocus,
  index,
  ariaLabelledby,
  tabIndex = -1,
}: Props) {
  const handleFocus = () => {
    if (onFocus != null) {
      onFocus({index, x: cx, y: cy});
    }
  };

  return (
    <circle
      role={ariaLabelledby == null ? '' : 'image'}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      cx={cx}
      cy={cy}
      r={active ? 5 : 0}
      fill={getColorValue(color)}
      stroke={tokens.colorWhite}
      strokeWidth={1.5}
      onFocus={handleFocus}
    />
  );
});
