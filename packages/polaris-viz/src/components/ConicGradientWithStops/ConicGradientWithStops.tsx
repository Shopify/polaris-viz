import type {GradientStop} from '@shopify/polaris-viz-core';

import {createCSSConicGradient} from '../../utilities';

export interface ConicGradientWithStopsProps {
  gradient: GradientStop[];
  height: number;
  width: number;
  x?: number;
  y?: number;
}

export function ConicGradientWithStops({
  gradient,
  height,
  width,
  x = 0,
  y = 0,
}: ConicGradientWithStopsProps) {
  const conicGradientValue = createCSSConicGradient(gradient);

  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: conicGradientValue,
        }}
      />
    </foreignObject>
  );
}
