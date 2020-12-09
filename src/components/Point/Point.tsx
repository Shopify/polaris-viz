import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

import {getColorValue} from '../../utilities';
import {TooltipContainer} from 'components/TooltipContainer';

interface Props {
  active: boolean;
  cx: number;
  cy: number;
  color: Color;
  isAnnotation?: boolean;
  setActiveAnnotation?: any;
  activeAnnotation?: boolean;
}

export function Point({
  cx,
  cy,
  active,
  color,
  isAnnotation,
  setActiveAnnotation,
  activeAnnotation,
}: Props) {
  // console.log({activeAnnotation});

  return (
    <>
      {/* if active, set glow around circle? */}

      <circle
        style={isAnnotation ? {cursor: 'pointer'} : undefined}
        cx={cx}
        cy={cy}
        r={isAnnotation ? 7 : active ? 5 : 0}
        fill={
          activeAnnotation === true
            ? getColorValue('colorYellow')
            : getColorValue(color)
        }
        stroke={tokens.colorWhite}
        strokeWidth={1.5}
        onClick={() => setActiveAnnotation(isAnnotation)}
        onMouseOut={() => {
          setActiveAnnotation(false);
        }}
      />
    </>
  );
}
