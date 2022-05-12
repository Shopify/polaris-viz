import {
  ChartContext,
  clamp,
  estimateStringWidth,
} from '@shopify/polaris-viz-core';
import type {ScaleBand} from 'd3-scale';
import {useContext, useEffect, useMemo} from 'react';

import {
  COLLAPSED_PILL_COUNT,
  PILL_HEIGHT,
  PILL_PADDING,
  PILL_ROW_GAP,
} from '../constants';
import type {Annotation} from '../../../types';
import type {AnnotationPosition} from '../types';

interface Props {
  annotations: Annotation[];
  barWidth: number;
  drawableWidth: number;
  isShowingAllAnnotations: boolean;
  onHeightChange: (height: number) => void;
  xScale: ScaleBand<string>;
}

export function useAnnotationPositions({
  annotations,
  barWidth,
  drawableWidth,
  isShowingAllAnnotations,
  onHeightChange,
  xScale,
}: Props): {
  positions: AnnotationPosition[];
  rowCount: number;
} {
  const {characterWidths} = useContext(ChartContext);

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions} = useMemo(() => {
    const positions = annotations.map((annotation, dataIndex) => {
      const xPosition = xScale(`${annotation.startIndex}`) ?? 0;

      const textWidth = textWidths[dataIndex];

      const width = clamp({
        amount: textWidth + PILL_PADDING * 2,
        min: textWidth + PILL_PADDING * 2,
        max: drawableWidth,
      });

      const centerOffset = barWidth / 2;

      const x = clamp({
        amount: xPosition + centerOffset,
        min: xPosition,
        max: xPosition + barWidth,
      });

      let left = clamp({
        amount: x - width / 2,
        min: 0,
        max: Infinity,
      });

      const right = left + width;

      if (right > drawableWidth) {
        left -= right - drawableWidth;
      }

      return {
        index: dataIndex,
        left,
        right,
        row: 1,
        width,
        lineX: x,
        y: 0,
      };
    });

    function checkForSpace(totalRows: number) {
      let checkAgain = false;

      [...Array.from({length: totalRows})].forEach((_, rowIndex) => {
        const currentRow = rowIndex + 1;
        positions
          .filter(({row}) => row === currentRow)
          .forEach((current, index, filtered) => {
            const nextRow = currentRow + 1;

            const next = filtered[index + 1];

            if (next == null) {
              return;
            }

            if (current.row === next.row && current.right > next.left) {
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
      const row = current.row - 1;
      current.y = row * PILL_HEIGHT + row * PILL_ROW_GAP;
    });

    return {positions};
  }, [annotations, textWidths, barWidth, xScale, drawableWidth]);

  const totalRowHeight = useMemo(() => {
    return (
      positions.reduce((total, {y, row}) => {
        if (!isShowingAllAnnotations && row > COLLAPSED_PILL_COUNT) {
          return total;
        }

        if (y > total) {
          return y;
        }
        return total;
      }, 0) +
      PILL_HEIGHT +
      PILL_ROW_GAP
    );
  }, [isShowingAllAnnotations, positions]);

  const rowCount = useMemo(() => {
    return Math.max(...positions.map(({row}) => row)) + 1;
  }, [positions]);

  useEffect(() => {
    onHeightChange(totalRowHeight);
  }, [onHeightChange, totalRowHeight]);

  return {positions, rowCount};
}
