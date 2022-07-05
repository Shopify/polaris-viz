import {useContext, useEffect, useMemo} from 'react';
import {
  ChartContext,
  clamp,
  estimateStringWidth,
} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';

import {
  checkForHorizontalSpace,
  useShowMoreAnnotationsButton,
  PILL_HEIGHT,
  PILL_PADDING,
  PILL_ROW_GAP,
  PILL_X_MIN,
  AnnotationPosition,
} from '../../../../Annotations';
import {COLLAPSED_ANNOTATIONS_COUNT} from '../../../../../constants';
import type {Annotation} from '../../../../../types';

export interface Props {
  annotations: Annotation[];
  drawableWidth: number;
  isShowingAllAnnotations: boolean;
  onHeightChange: (height: number) => void;
  xScale: ScaleLinear<number, number>;
}

export function useHorizontalBarChartXAnnotationPositions({
  annotations,
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
        max: Infinity,
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

    const hiddenAnnotationsCount = positions.filter(
      ({row}) => row >= COLLAPSED_ANNOTATIONS_COUNT,
    ).length;

    return {positions, hiddenAnnotationsCount};
  }, [annotations, textWidths, xScale, drawableWidth]);

  const {rowCount, totalRowHeight} = useShowMoreAnnotationsButton({
    isShowingAllAnnotations,
    positions,
  });

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
