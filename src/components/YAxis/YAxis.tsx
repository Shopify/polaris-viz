import React from 'react';
import {
  colorSky,
  colorSkyDark,
  colorInkLighter,
  spacingBase,
  spacingExtraTight,
} from '@shopify/polaris-tokens';
import {animated, useSpring} from 'react-spring';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
}

function Axis({ticks, drawableWidth}: Props) {
  const props = useSpring({
    config: {duration: 800},
    opacity: '100%',
    from: {opacity: '0%'},
    reset: true,
  });

  return (
    <animated.g {...props}>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            <line
              x2={drawableWidth}
              stroke={value === 0 ? colorSkyDark : colorSky}
            />
            <text
              fill={colorInkLighter}
              style={{
                fontSize: '12px',
                textAnchor: 'end',
                transform: `translateX(-${spacingBase}) translateY(${spacingExtraTight})`,
              }}
            >
              {formattedValue}
            </text>
          </g>
        );
      })}
    </animated.g>
  );
}

export const YAxis = React.memo(Axis);
