import {
  ChartContext,
  clamp,
  estimateStringWidth,
} from '@shopify/polaris-viz-core';
import type {ScaleBand} from 'd3-scale';
import {useContext, useEffect, useMemo} from 'react';

import {PILL_HEIGHT, PILL_PADDING} from '../constants';
import type {Annotation} from '../../../types';
import type {AnnotationPosition} from '../types';

const ROW_GAP = 8;

interface Props {
  annotations: Annotation[];
  axisLabelWidth: number;
  drawableWidth: number;
  onHeightChange: (height: number) => void;
  xScale: ScaleBand<string>;
}

export function useAnnotationPositions({
  annotations,
  axisLabelWidth,
  drawableWidth,
  onHeightChange,
  xScale,
}: Props): AnnotationPosition[] {
  const {characterWidths} = useContext(ChartContext);

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions, totalRowHeight} = useMemo(() => {
    const positions = annotations.map((annotation, dataIndex) => {
      const xPosition = xScale(`${annotation.startIndex}`) ?? 0;

      const textWidth = textWidths[dataIndex];

      const width = clamp({
        amount: textWidth + PILL_PADDING * 2,
        min: textWidth + PILL_PADDING * 2,
        max: drawableWidth,
      });

      const centerOffset = axisLabelWidth / 2;

      const rawX = clamp({
        amount: xPosition + centerOffset,
        min: xPosition,
        max: xPosition + axisLabelWidth,
      });

      let x = clamp({
        amount: rawX - width / 2,
        min: 0,
        max: Infinity,
      });

      const right = x + width;

      if (right > drawableWidth) {
        x -= right - drawableWidth;
      }

      return {
        index: dataIndex,
        line: {
          x: rawX,
          y: 0,
        },
        row: 0,
        width,
        x,
        y: 0,
      };
    });

    function checkForSpace(totalRows: number) {
      let checkAgain = false;

      [...Array.from({length: totalRows})].forEach((_, rowIndex) => {
        positions
          .filter(({row}) => row === rowIndex)
          .forEach((current, index, filtered) => {
            const nextRow = rowIndex + 1;

            const next = filtered[index + 1];

            if (next == null) {
              return;
            }

            if (
              current.row === next.row &&
              current.x + current.width > next.x
            ) {
              next.row = nextRow;

              checkAgain = true;
            }
          });
      });

      if (checkAgain) {
        checkForSpace(totalRows + 1);
      }
    }

    checkForSpace(1);

    positions.forEach((current) => {
      current.y = current.row * PILL_HEIGHT + current.row * ROW_GAP;
    });

    const totalRowHeight =
      positions.reduce((total, {y}) => {
        if (y > total) {
          return y;
        }
        return total;
      }, 0) +
      PILL_HEIGHT +
      ROW_GAP;

    return {positions, totalRowHeight};
  }, [annotations, textWidths, axisLabelWidth, xScale, drawableWidth]);

  useEffect(() => {
    onHeightChange(totalRowHeight);
  }, [onHeightChange, totalRowHeight]);

  return positions;
}
