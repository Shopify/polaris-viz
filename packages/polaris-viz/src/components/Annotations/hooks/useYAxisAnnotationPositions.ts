import {useContext, useMemo} from 'react';
import {
  ChartContext,
  clamp,
  estimateStringWidth,
  LINE_HEIGHT,
} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';

import {
  ANNOTATION_Y_AXIS_LABEL_HEIGHT,
  PILL_HEIGHT,
  PILL_PADDING,
  PILL_ROW_GAP,
} from '../constants';
import type {Annotation, YAxisTick} from '../../../types';
import type {AnnotationPosition} from '../types';

export interface Props {
  annotations: Annotation[];
  drawableWidth: number;
  ticks: YAxisTick[];
  yScale: ScaleLinear<number, number>;
}

export function useYAxisAnnotationPositions({
  annotations,
  drawableWidth,
  ticks,
  yScale,
}: Props): {
  positions: AnnotationPosition[];
} {
  const {characterWidths} = useContext(ChartContext);

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions} = useMemo(() => {
    let positions = annotations.map((annotation, dataIndex) => {
      const rawY: number = yScale(Number(annotation.startKey)) ?? 0;

      const textWidth = textWidths[dataIndex];

      const width = clamp({
        amount: textWidth + PILL_PADDING * 2,
        min: textWidth + PILL_PADDING * 2,
        max: drawableWidth,
      });

      const y = clamp({
        amount: rawY - PILL_HEIGHT / 2,
        min: 0,
        max: Infinity,
      });

      return {
        index: dataIndex,
        line: {
          x: 0,
          y: rawY,
        },
        showYAxisLabel: true,
        row: 1,
        width,
        x: drawableWidth - width,
        y,
      };
    });

    positions = positions.sort((one, two) => one.y - two.y);

    ticks.forEach(({yOffset}) => {
      positions.forEach((current) => {
        const top = current.line.y - LINE_HEIGHT / 2;
        const bottom = top + LINE_HEIGHT;

        if (yOffset > top && yOffset < bottom) {
          current.showYAxisLabel = false;
        }
      });
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

            if (current.line.y + ANNOTATION_Y_AXIS_LABEL_HEIGHT > next.line.y) {
              next.showYAxisLabel = false;
            }

            const top = current.y;
            const bottom = current.y + PILL_HEIGHT;

            if (next.y > top && next.y < bottom) {
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
      current.x -= (current.width + PILL_ROW_GAP) * row;
    });

    return {positions};
  }, [annotations, ticks, textWidths, yScale, drawableWidth]);

  return {
    positions,
  };
}
