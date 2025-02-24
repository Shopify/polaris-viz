import type {GradientStop} from '@shopify/polaris-viz-core';
import {Fragment} from 'react';

import {getTooltipDataAttr} from '../TooltipWrapper';
import {createCSSConicGradient} from '../../utilities';

export interface ConicGradientWithStopsProps {
  gradient: GradientStop[];
  height: number;
  width: number;
  index: number;
  x?: number;
  y?: number;
}

export function ConicGradientWithStops({
  gradient,
  height,
  width,
  x = 0,
  y = 0,
  index,
}: ConicGradientWithStopsProps) {
  const conicGradientValue = createCSSConicGradient(gradient);

  return (
    <Fragment>
      <foreignObject x={x} y={y} width={width} height={height}>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: conicGradientValue,
          }}
        />
      </foreignObject>
      <rect
        {...getTooltipDataAttr({
          index,
        })}
        width={width}
        height={height}
        x={x}
        y={y}
        fill="transparent"
      />
    </Fragment>
  );
}
