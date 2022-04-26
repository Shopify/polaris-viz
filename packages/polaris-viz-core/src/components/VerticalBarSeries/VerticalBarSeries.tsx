import React from 'react';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import {IS_ANIMATED_DEFAULT} from '../../constants';
import {useTheme} from '../../hooks';
import type {Color} from '../../types';

import {BarGroup} from './components';

interface VerticalBarSeriesProps {
  accessibilityData;
  activeBarGroup: number;
  colors: Color[];
  data: number[][];
  gapWidth: number;
  height: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  isAnimated?: boolean;
  theme?: string;
}

export function VerticalBarSeries({
  accessibilityData,
  activeBarGroup,
  colors,
  data,
  height,
  gapWidth,
  isAnimated = IS_ANIMATED_DEFAULT,
  theme,
  xScale,
  yScale,
}: VerticalBarSeriesProps) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      {data.map((item, index) => {
        const xPosition = xScale(index.toString());
        return (
          <BarGroup
            accessibilityData={accessibilityData}
            activeBarGroup={activeBarGroup}
            barGroupIndex={index}
            colors={colors}
            data={item}
            gapWidth={gapWidth}
            hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
            height={height}
            isAnimated={isAnimated}
            key={index}
            width={xScale.bandwidth()}
            x={xPosition == null ? 0 : xPosition}
            yScale={yScale}
            zeroAsMinHeight={selectedTheme.bar.zeroAsMinHeight}
          />
        );
      })}
    </React.Fragment>
  );
}
