import React, {Dispatch, SetStateAction} from 'react';
import type {ScaleBand} from 'd3-scale';

import {FONT_SIZE} from '../../constants';
import {useTheme} from '../../hooks';

import {useLabels} from './hooks/useLabels';

interface LabelsProps {
  chartX: number;
  chartY: number;
  labels: string[];
  labelWidth: number;
  minimalLabelIndexes: number[] | null;
  onHeightChange: Dispatch<SetStateAction<number>>;
  xScale: ScaleBand<string>;
  theme?: string;
}

export function Labels({
  chartX,
  chartY,
  labels,
  labelWidth,
  minimalLabelIndexes,
  onHeightChange,
  theme,
  xScale,
}: LabelsProps) {
  const selectedTheme = useTheme(theme);
  const {lines} = useLabels({labels, targetWidth: labelWidth, onHeightChange});

  return (
    <React.Fragment>
      {lines.map((line, index) => {
        if (
          minimalLabelIndexes !== null &&
          !minimalLabelIndexes.includes(index)
        ) {
          return null;
        }

        const x = xScale(index.toString()) ?? 0;

        return (
          <g transform={`translate(${chartX + x},${chartY})`} key={index}>
            {line.map(
              (
                {
                  dominantBaseline,
                  height,
                  fullText,
                  truncatedText,
                  textAnchor,
                  transform,
                  width,
                  x,
                  y,
                },
                textIndex,
              ) => {
                return (
                  <React.Fragment key={index + textIndex}>
                    <text
                      textAnchor={textAnchor}
                      dominantBaseline={dominantBaseline}
                      height={height}
                      width={width}
                      x={x}
                      y={y}
                      fill={selectedTheme.xAxis.labelColor}
                      fontSize={FONT_SIZE}
                      transform={transform}
                    >
                      {truncatedText}
                    </text>
                    <title>{fullText}</title>
                  </React.Fragment>
                );
              },
            )}
          </g>
        );
      })}
    </React.Fragment>
  );
}
