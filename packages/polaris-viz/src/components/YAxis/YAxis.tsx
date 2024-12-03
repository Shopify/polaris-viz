import {clamp, useTheme} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../utilities/estimateStringWidthWithOffset';
import {SingleTextLine} from '../Labels/SingleTextLine';
import {LINE_HEIGHT} from '../../constants';
import type {YAxisTick} from '../../types';
import {getFontSize} from '../../utilities/getFontSize';

interface Props {
  ticks: YAxisTick[];
  textAlign: 'left' | 'right';
  width: number;
  x: number;
  y: number;
  ariaHidden?: boolean;
}

const PADDING_SIZE = 2;

export function YAxis({
  ticks,
  width,
  textAlign,
  ariaHidden = false,
  x,
  y,
}: Props) {
  const selectedTheme = useTheme();
  const fontSize = getFontSize();

  return (
    <g transform={`translate(${x},${y})`} aria-hidden="true">
      {ticks.map(({value, formattedValue, yOffset}) => {
        const stringWidth = estimateStringWidthWithOffset(
          formattedValue,
          fontSize,
        );

        const clampedWidth = clamp({
          amount: width,
          min: width + PADDING_SIZE,
          max: stringWidth,
        });

        const x = textAlign === 'right' ? width - clampedWidth : 0;

        return (
          <g key={value} transform={`translate(${x},${yOffset})`}>
            <rect
              height={LINE_HEIGHT}
              width={clampedWidth + PADDING_SIZE}
              fill={selectedTheme.chartContainer.backgroundColor}
              y={-LINE_HEIGHT / 2}
              x={-PADDING_SIZE}
            />
            <SingleTextLine
              x={0}
              y={0}
              ariaHidden={ariaHidden}
              color={selectedTheme.yAxis.labelColor}
              fontSize={fontSize}
              targetWidth={clampedWidth}
              text={formattedValue}
              textAnchor="left"
              dominantBaseline="middle"
            />
          </g>
        );
      })}
    </g>
  );
}
