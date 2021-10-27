import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {FONT_SIZE, MIN_BAR_HEIGHT} from '../../../constants';
import type {Data, LabelFormatter} from '../types';
import {getTextWidth} from '../../../utilities';
import {
  BAR_LABEL_OFFSET,
  FONT_SIZE_PADDING,
  LABEL_HEIGHT,
  SPACE_BETWEEN_SINGLE,
} from '../constants';
import {useTheme} from '../../../hooks';
import {getBarId} from '../utilities';

import {Bar, RoundedBorder} from './Bar';
import {Label} from './Label';
import {getGradientDefId} from './GradientDefs';

interface HorizontalBarProps {
  ariaLabel: string;
  barHeight: number;
  groupIndex: number;
  isAnimated: boolean;
  isSimple: boolean;
  labelFormatter: LabelFormatter;
  name: string;
  series: Data[];
  xScale: ScaleLinear<number, number>;
  animationDelay?: number;
  theme?: string;
}

export function HorizontalBars({
  animationDelay,
  ariaLabel,
  barHeight,
  groupIndex,
  isAnimated,
  isSimple,
  labelFormatter,
  name,
  series,
  theme,
  xScale,
}: HorizontalBarProps) {
  const selectedTheme = useTheme(theme);

  return (
    <g
      transform={`translate(0,${LABEL_HEIGHT})`}
      aria-label={ariaLabel}
      role="listitem"
    >
      {series.map(({rawValue, color}, seriesIndex) => {
        const needsMinWidth = selectedTheme.bar.zeroAsMinHeight
          ? rawValue < MIN_BAR_HEIGHT
          : rawValue < MIN_BAR_HEIGHT && rawValue !== 0;

        const isNegative = rawValue < 0;
        const label = labelFormatter(rawValue);
        const id = getBarId(groupIndex, seriesIndex);

        const labelWidth = getTextWidth({
          text: `${label}`,
          fontSize: FONT_SIZE + FONT_SIZE_PADDING,
        });

        const leftLabelOffset = isSimple ? labelWidth + BAR_LABEL_OFFSET : 0;
        const width = Math.abs(xScale(rawValue) - xScale(0));

        const y = barHeight * seriesIndex + SPACE_BETWEEN_SINGLE * seriesIndex;
        const negativeX = (width + leftLabelOffset) * -1;
        const x = isNegative ? negativeX : width + BAR_LABEL_OFFSET;
        const ariaHidden = seriesIndex !== 0;
        const barColor = color ? id : getGradientDefId(theme, seriesIndex);

        return (
          <React.Fragment key={`series-${barColor}-${name}`}>
            <Bar
              animationDelay={animationDelay}
              color={`url(#${barColor})`}
              height={barHeight}
              index={groupIndex}
              isAnimated={isAnimated}
              needsMinWidth={needsMinWidth}
              role="img"
              roundedBorder={RoundedBorder.Right}
              tabIndex={ariaHidden ? -1 : 0}
              transform={isNegative ? 'scaleX(-1)' : ''}
              width={width}
              x={0}
              y={y}
            />
            {isSimple && (
              <Label
                animationDelay={animationDelay}
                barHeight={barHeight}
                color={selectedTheme.xAxis.labelColor}
                isAnimated={isAnimated}
                label={label}
                labelWidth={labelWidth}
                x={x}
                y={y}
              />
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
}
