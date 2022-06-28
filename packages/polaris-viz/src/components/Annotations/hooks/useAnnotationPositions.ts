import {useContext, useEffect, useMemo} from 'react';
import {
  ChartContext,
  clamp,
  estimateStringWidth,
  getValueFromXScale,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import {
  COLLAPSED_PILL_COUNT,
  PILL_HEIGHT,
  PILL_PADDING,
  PILL_ROW_GAP,
  PILL_X_MIN,
  SHOW_MORE_BUTTON_OFFSET,
} from '../constants';
import type {Annotation} from '../../../types';
import type {AnnotationPosition} from '../types';
import {isShowMoreAnnotationsButtonVisible} from '../utilities/isShowMoreAnnotationsButtonVisible';

export interface Props {
  annotations: Annotation[];
  axisLabelWidth: number;
  dataIndexes: {[key: string]: string};
  drawableWidth: number;
  isShowingAllAnnotations: boolean;
  onHeightChange: (height: number) => void;
  xScale: ScaleLinear<number, number> | ScaleBand<string>;
}

export function useAnnotationPositions({
  annotations,
  axisLabelWidth,
  dataIndexes,
  drawableWidth,
  isShowingAllAnnotations,
  onHeightChange,
  xScale,
}: Props): {
  hiddenAnnotationsCount: number;
  positions: AnnotationPosition[];
  rowCount: number;
} {
  const {characterWidths} = useContext(ChartContext);

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions, hiddenAnnotationsCount} = useMemo(() => {
    let positions = annotations.map((annotation, dataIndex) => {
      const xPosition = getValueFromXScale(
        dataIndexes[annotation.startKey],
        xScale,
      );

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
        min: PILL_X_MIN,
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
        row: 1,
        width,
        x,
        y: 0,
      };
    });

    positions = positions.sort((one, two) => one.x - two.x);

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

            const left = current.x;
            const right = current.x + current.width;

            if (current.row === next.row && next.x > left && next.x < right) {
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

    const hiddenAnnotationsCount = positions.filter(
      ({row}) => row >= COLLAPSED_PILL_COUNT,
    ).length;

    return {positions, hiddenAnnotationsCount};
  }, [
    annotations,
    dataIndexes,
    textWidths,
    axisLabelWidth,
    xScale,
    drawableWidth,
  ]);

  const rowCount = useMemo(() => {
    return Math.max(...positions.map(({row}) => row)) + 1;
  }, [positions]);

  const showMoreButtonOffset = useMemo(() => {
    if (!isShowingAllAnnotations) {
      return 0;
    }

    return isShowMoreAnnotationsButtonVisible(rowCount)
      ? SHOW_MORE_BUTTON_OFFSET
      : 0;
  }, [rowCount, isShowingAllAnnotations]);

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
      PILL_ROW_GAP +
      showMoreButtonOffset
    );
  }, [isShowingAllAnnotations, showMoreButtonOffset, positions]);

  useEffect(() => {
    onHeightChange(totalRowHeight);
  }, [onHeightChange, totalRowHeight]);

  return {
    positions,
    rowCount,
    hiddenAnnotationsCount: isShowingAllAnnotations
      ? 0
      : hiddenAnnotationsCount,
  };
}
