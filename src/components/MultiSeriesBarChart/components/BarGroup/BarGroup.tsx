import React from 'react';
import {ScaleLinear} from 'd3-scale';
import {Color, GradientColor} from 'types';

import {Bar} from '../../../Bar';
import {BAR_SPACING} from '../../constants';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  data: number[];
  colors: (Color | GradientColor)[];
  highlightColors: (Color | GradientColor)[];
  isActive: boolean;
  barGroupIndex: number;
  ariaLabel: string;
  onFocus: (index: number) => void;
  hasRoundedCorners: boolean;
}

export function BarGroup({
  x,
  data,
  yScale,
  width,
  colors,
  isActive,
  highlightColors,
  onFocus,
  barGroupIndex,
  ariaLabel,
  hasRoundedCorners,
}: Props) {
  const barWidth = width / data.length - BAR_SPACING;

  return (
    <React.Fragment>
      {data.map((value, index) => {
        const handleFocus = () => {
          onFocus(barGroupIndex);
        };

        const ariaEnabledBar = index === 0;

        return (
          <g
            role={index === 0 ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={index}
          >
            <Bar
              color={colors[index]}
              highlightColor={highlightColors[index]}
              isSelected={isActive}
              x={x + (barWidth + BAR_SPACING) * index}
              yScale={yScale}
              rawValue={value}
              width={barWidth}
              index={index}
              onFocus={handleFocus}
              tabIndex={ariaEnabledBar ? 0 : -1}
              role={ariaEnabledBar ? 'img' : undefined}
              ariaLabel={ariaEnabledBar ? ariaLabel : undefined}
              hasRoundedCorners={hasRoundedCorners}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
