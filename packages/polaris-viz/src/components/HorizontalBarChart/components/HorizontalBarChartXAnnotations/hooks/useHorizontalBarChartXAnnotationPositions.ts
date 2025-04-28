import {useEffect, useMemo} from 'react';
import {
  clamp,
  estimateStringWidth,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';

import type {AnnotationPosition} from '../../../../Annotations';
import {
  checkForHorizontalSpace,
  PILL_HEIGHT,
  PILL_PADDING,
  PILL_ROW_GAP,
  PILL_X_MIN,
} from '../../../../Annotations';
import type {Annotation} from '../../../../../types';

export interface Props {
  annotations: Annotation[];
  drawableWidth: number;
  onHeightChange: (height: number) => void;
  xScale: ScaleLinear<number, number>;
}

export function useHorizontalBarChartXAnnotationPositions({
  annotations,
  drawableWidth,
  onHeightChange,
  xScale,
}: Props): AnnotationPosition[] {
  const {characterWidths} = useChartContext();

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions} = useMemo(() => {
    let positions = annotations.map((annotation, dataIndex) => {
      const xPosition = xScale(Number(annotation.startKey));

      const textWidth = textWidths[dataIndex];

      const width = clamp({
        amount: textWidth + PILL_PADDING * 2,
        min: textWidth + PILL_PADDING * 2,
        max: drawableWidth,
      });

      let x = clamp({
        amount: xPosition - width / 2,
        min: PILL_X_MIN,
      });

      const right = x + width;

      if (right > drawableWidth) {
        x -= right - drawableWidth;
      }

      return {
        index: dataIndex,
        line: {
          x: xPosition,
          y: 0,
        },
        row: 1,
        width,
        x,
        y: 0,
      };
    });

    positions = positions.sort((one, two) => one.x - two.x);

    checkForHorizontalSpace({positions, totalRows: 1});

    positions.forEach((current) => {
      const row = current.row - 1;
      current.y = row * PILL_HEIGHT + row * PILL_ROW_GAP;
    });

    return {positions};
  }, [annotations, textWidths, xScale, drawableWidth]);

  const totalRowHeight = useMemo(() => {
    return (
      positions.reduce((total, {y}) => {
        if (y > total) {
          return y;
        }

        return total;
      }, 0) +
      PILL_HEIGHT +
      PILL_ROW_GAP
    );
  }, [positions]);

  useEffect(() => {
    onHeightChange(totalRowHeight);
  }, [onHeightChange, totalRowHeight]);

  return positions;
}
