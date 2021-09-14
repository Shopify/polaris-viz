import React from 'react';
import type {ScaleBand} from 'd3-scale';

import {useTheme} from '../../hooks';
import {
  TICK_SIZE,
  BELOW_X_AXIS_MARGIN,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
  DEFAULT_LABEL_RATIO,
  SPACING_BASE_TIGHT,
} from '../../constants';
import {RightAngleTriangle} from '../../utilities';

import styles from './BarChartXAxis.scss';

interface XAxisDetails {
  maxXLabelHeight: number;
  maxDiagonalLabelLength: number;
  needsDiagonalLabels: boolean;
  maxWidth: number;
}

function getTextAlign({
  isFirstLabel,
  isLastLabel,
  needsDiagonalLabels,
  useMiniminalLabels,
}: {
  isFirstLabel: boolean;
  isLastLabel: boolean;
  needsDiagonalLabels: boolean;
  useMiniminalLabels: boolean;
}) {
  if (isFirstLabel && useMiniminalLabels) {
    return 'left';
  } else if ((isLastLabel && useMiniminalLabels) || needsDiagonalLabels) {
    return 'right';
  } else {
    return 'center';
  }
}

function getMiniminalLabelPosition({
  isLastLabel,
  xOffset,
  width,
  isFirstLabel,
  bandWidth,
}: {
  isLastLabel: boolean;
  xOffset: number;
  width: number;
  isFirstLabel: boolean;
  bandWidth: number;
}) {
  if (isLastLabel) {
    return xOffset - width + bandWidth / 2;
  }

  if (isFirstLabel) {
    return xOffset - bandWidth / 2;
  }

  return xOffset - width / 2;
}

interface BarChartXAxisProps {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  fontSize: number;
  xAxisDetails: XAxisDetails;

  minimalLabelIndexes?: number[] | null;
  theme?: string;
}

export const BarChartXAxis = React.memo(function BarChartXAxis({
  labels,
  xScale,
  fontSize,
  xAxisDetails,
  minimalLabelIndexes,
  theme,
}: BarChartXAxisProps) {
  const selectedTheme = useTheme(theme);

  const {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    maxWidth,
  } = xAxisDetails;

  const diagonalLabelOffset = new RightAngleTriangle({
    sideC: maxDiagonalLabelLength,
    sideA: maxXLabelHeight,
  }).getOppositeLength();

  const textTransform = needsDiagonalLabels
    ? `translate(${-diagonalLabelOffset - SPACING_BASE_TIGHT / 2} ${
        maxXLabelHeight + BELOW_X_AXIS_MARGIN / 2
      }) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${maxWidth / 2} ${BELOW_X_AXIS_MARGIN})`;

  const textHeight = needsDiagonalLabels
    ? LINE_HEIGHT
    : maxXLabelHeight + SPACING_EXTRA_TIGHT;
  const textContainerClassName = needsDiagonalLabels
    ? styles.DiagonalText
    : styles.Text;

  const diagonalLabelSpacePerBar = Math.floor((LINE_HEIGHT * 2) / maxWidth);
  const visibleLabelRatio = needsDiagonalLabels
    ? Math.max(diagonalLabelSpacePerBar, 1)
    : DEFAULT_LABEL_RATIO;

  const angleAwareWidth = needsDiagonalLabels
    ? maxDiagonalLabelLength
    : maxWidth;

  return (
    <React.Fragment>
      {labels.map(({value, xOffset}, index) => {
        if (
          (needsDiagonalLabels && index % visibleLabelRatio !== 0) ||
          (minimalLabelIndexes != null && !minimalLabelIndexes.includes(index))
        ) {
          return null;
        }

        const isFirstLabel = index === 0;
        const isLastLabel = index + 1 === labels.length;

        const minimumLabelsPosition = getMiniminalLabelPosition({
          isLastLabel,
          isFirstLabel,
          xOffset,
          width: maxWidth,
          bandWidth: xScale.bandwidth(),
        });

        const groupTransform =
          needsDiagonalLabels || minimalLabelIndexes == null
            ? `translate(${xOffset}, 0)`
            : `translate(${minimumLabelsPosition}, ${BELOW_X_AXIS_MARGIN})`;

        const textAlign = getTextAlign({
          isFirstLabel,
          isLastLabel,
          needsDiagonalLabels,
          useMiniminalLabels: minimalLabelIndexes != null,
        });

        return (
          <g key={index} transform={groupTransform}>
            {minimalLabelIndexes == null && selectedTheme.xAxis.showTicks ? (
              <line y2={TICK_SIZE} stroke={selectedTheme.grid.color} />
            ) : null}
            <foreignObject
              width={angleAwareWidth}
              height={textHeight}
              transform={
                needsDiagonalLabels || minimalLabelIndexes == null
                  ? textTransform
                  : ''
              }
            >
              <div
                className={textContainerClassName}
                style={{
                  fontSize,
                  color: selectedTheme.xAxis.labelColor,
                  textAlign,
                }}
              >
                {value}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </React.Fragment>
  );
});
