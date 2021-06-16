import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {colorSky} from '@shopify/polaris-tokens';

import {RightAngleTriangle} from '../../utilities';
import {
  TICK_SIZE,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
  BELOW_X_AXIS_MARGIN,
  DEFAULT_GREY_LABEL,
} from '../../constants';

import styles from './LinearXAxis.scss';

interface XAxisDetails {
  maxXLabelHeight: number;
  maxDiagonalLabelLength: number;
  needsDiagonalLabels: boolean;
  ticks: number[];
  horizontalLabelWidth: number;
}

interface Props {
  xScale: ScaleLinear<number, number>;
  labels: string[] | null;
  drawableWidth: number;
  fontSize: number;
  xAxisDetails: XAxisDetails;
  drawableHeight: number;
  ariaHidden: boolean;
  showGridLines?: boolean;
  gridColor?: string;
  showTicks?: boolean;
  labelColor?: string;
}

function getTextAlign({
  needsDiagonalLabels,
  firstLabel,
  adjustedLastLabel,
}: {
  needsDiagonalLabels: boolean;
  firstLabel: boolean;
  adjustedLastLabel: boolean;
}) {
  if (needsDiagonalLabels || adjustedLastLabel) {
    return 'right';
  } else if (firstLabel) {
    return 'left';
  } else {
    return 'center';
  }
}

function Axis({
  xScale,
  labels,
  xAxisDetails,
  fontSize,
  drawableWidth,
  drawableHeight,
  ariaHidden,
  showGridLines = true,
  showTicks = true,
  gridColor = colorSky,
  labelColor = DEFAULT_GREY_LABEL,
}: Props) {
  const {
    maxDiagonalLabelLength,
    maxXLabelHeight,
    needsDiagonalLabels,
    ticks,
    horizontalLabelWidth,
  } = xAxisDetails;

  const tickDetails = useMemo(() => {
    if (labels == null) {
      return [];
    }

    return ticks.map((value) => {
      return {
        value: labels[value],
        xOffset: xScale(value),
        firstLabel: value === 0,
      };
    });
  }, [labels, ticks, xScale]);

  const diagonalLabelOffset = new RightAngleTriangle({
    sideC: maxDiagonalLabelLength,
    sideA: maxXLabelHeight,
  }).getOppositeLength();

  const textHeight = needsDiagonalLabels ? LINE_HEIGHT : maxXLabelHeight;

  const textContainerClassName = needsDiagonalLabels
    ? styles.DiagonalText
    : styles.Text;

  return (
    <React.Fragment>
      {tickDetails.map(({value, xOffset, firstLabel}, index) => {
        const textWidth = needsDiagonalLabels
          ? maxDiagonalLabelLength
          : horizontalLabelWidth;

        const firstLabelAdjustment = firstLabel ? textWidth / 2 : 0;
        const adjustedLastLabel =
          Math.floor(xOffset + horizontalLabelWidth / 2) > drawableWidth;

        const horizontalXPosition = adjustedLastLabel
          ? -horizontalLabelWidth
          : -horizontalLabelWidth / 2;

        const textAlign = getTextAlign({
          needsDiagonalLabels,
          firstLabel,
          adjustedLastLabel,
        });

        const tickContainerTransform = needsDiagonalLabels
          ? `translate(${-diagonalLabelOffset - SPACING_EXTRA_TIGHT} ${
              maxXLabelHeight + BELOW_X_AXIS_MARGIN / 2
            }) rotate(${DIAGONAL_ANGLE})`
          : `translate(${
              horizontalXPosition + firstLabelAdjustment
            } ${BELOW_X_AXIS_MARGIN})`;

        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            {showTicks ? <line y2={TICK_SIZE} stroke={gridColor} /> : null}
            {showGridLines ? (
              <line
                y1="0"
                y2={-drawableHeight}
                stroke={gridColor}
                strokeDasharray="3 2"
              />
            ) : null}
            <foreignObject
              width={textWidth}
              height={textHeight}
              transform={tickContainerTransform}
            >
              <div
                aria-hidden={ariaHidden}
                className={textContainerClassName}
                style={{
                  fontSize,
                  textAlign,
                  color: labelColor,
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

export const LinearXAxis = React.memo(Axis);
