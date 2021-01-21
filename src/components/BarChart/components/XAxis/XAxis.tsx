import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';
import {ScaleBand} from 'd3-scale';

import {
  TICK_SIZE,
  SPACING_TIGHT,
  SPACING_EXTRA_TIGHT,
  DIAGONAL_ANGLE,
  LINE_HEIGHT,
  DEFAULT_LABEL_RATIO,
} from '../../constants';
import {getMissingSideOfTriangle} from '../../../../utilities';

import styles from './XAxis.scss';

export function XAxis({
  labels,
  xScale,
  fontSize,
  showFewerLabels,
  needsDiagonalLabels,
  labelHeight,
  angledLabelHeight,
  maxDiagonalLabelLength,
}: {
  xScale: ScaleBand<string>;
  labels: {value: string; xOffset: number}[];
  needsDiagonalLabels: boolean;
  fontSize: number;
  showFewerLabels: boolean;
  labelHeight: number;
  angledLabelHeight: number;
  maxDiagonalLabelLength: number;
}) {
  const [xScaleMin, xScaleMax] = xScale.range();

  // the side of a triangle that represents the distance between the start of the bar
  // and the start of the label, to detmine how much labels needs to be moved?
  const diagonalShift = getMissingSideOfTriangle({
    side1: maxDiagonalLabelLength,
    side2: angledLabelHeight,
  });

  const diagonalLabelSpacePerBar = Math.floor(
    (LINE_HEIGHT * 2) / xScale.bandwidth(),
  );
  const visibleLabelRatio = needsDiagonalLabels
    ? Math.max(diagonalLabelSpacePerBar, 1)
    : DEFAULT_LABEL_RATIO;

  const transform = needsDiagonalLabels
    ? `translate(${-diagonalShift - SPACING_EXTRA_TIGHT} ${angledLabelHeight +
        SPACING_EXTRA_TIGHT}) rotate(${DIAGONAL_ANGLE})`
    : `translate(-${xScale.bandwidth() / 2} ${SPACING_TIGHT})`;

  const textHeight = needsDiagonalLabels ? LINE_HEIGHT : labelHeight;
  const textWidth = needsDiagonalLabels
    ? maxDiagonalLabelLength
    : xScale.bandwidth();
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

      {labels.map(({value, xOffset}, index) => {
        if (showFewerLabels && index % visibleLabelRatio !== 0) {
          return null;
        }
        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <foreignObject
              width={textWidth}
              height={textHeight}
              transform={transform}
            >
              <div
                className={textContainerClassName}
                style={{
                  fontSize,
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
