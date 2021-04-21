import React from 'react';
import {ScaleBand} from 'd3-scale';

import {
  TICK_SIZE,
  SPACING_TIGHT,
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

export function BarChartXAxis({
  labels,
  xScale,
  fontSize,
  xAxisDetails,
  textColor,
  gridColor,
  showTicks,
  minimalLabelIndexes,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  fontSize: number;
  xAxisDetails: XAxisDetails;
  textColor: string;
  gridColor: string;
  showTicks: boolean;
  minimalLabelIndexes?: number[] | null;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

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
    ? `translate(${-diagonalLabelOffset -
        SPACING_BASE_TIGHT / 2} ${maxXLabelHeight +
        SPACING_EXTRA_TIGHT / 2}) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${maxWidth / 2} ${SPACING_TIGHT})`;

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

  const width =
    minimalLabelIndexes == null
      ? maxWidth
      : (xScaleMax - xScaleMin) / minimalLabelIndexes.length;

  const angleAwareWidth = needsDiagonalLabels ? maxDiagonalLabelLength : width;

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={gridColor}
      />

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
          width,
          bandWidth: xScale.bandwidth(),
        });

        const groupTransform =
          needsDiagonalLabels || minimalLabelIndexes == null
            ? `translate(${xOffset}, 0)`
            : `translate(${minimumLabelsPosition}, ${SPACING_TIGHT})`;

        const textAlign = getTextAlign({
          isFirstLabel,
          isLastLabel,
          needsDiagonalLabels,
          useMiniminalLabels: minimalLabelIndexes != null,
        });

        return (
          <g key={index} transform={groupTransform}>
            {minimalLabelIndexes == null || showTicks ? (
              <line y2={TICK_SIZE} stroke={gridColor} />
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
                  color: textColor,
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
}
