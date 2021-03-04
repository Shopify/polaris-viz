import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {colorSky} from '@shopify/polaris-tokens';

import {RightAngleTriangle} from '../../utilities';
import {
  TICK_SIZE,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
  SPACING_TIGHT,
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

  const [xScaleMin, xScaleMax] = xScale.range();

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
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

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
          ? `translate(${-diagonalLabelOffset -
              SPACING_EXTRA_TIGHT} ${maxXLabelHeight +
              SPACING_EXTRA_TIGHT}) rotate(${DIAGONAL_ANGLE})`
          : `translate(${horizontalXPosition +
              firstLabelAdjustment} ${SPACING_TIGHT})`;

        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <line
              y1="0"
              y2={-drawableHeight}
              stroke={colorSky}
              strokeDasharray="3 2"
            />
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
