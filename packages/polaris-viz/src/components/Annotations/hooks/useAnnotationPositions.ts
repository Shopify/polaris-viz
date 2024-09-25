import {useEffect, useMemo} from 'react';
import {
  clamp,
  estimateStringWidth,
  getValueFromXScale,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import {COLLAPSED_ANNOTATIONS_COUNT} from '../../../constants';
import {
  PILL_HEIGHT,
  PILL_PADDING,
  PILL_ROW_GAP,
  PILL_X_MIN,
} from '../constants';
import type {Annotation} from '../../../types';
import type {AnnotationPosition} from '../types';
import {checkForHorizontalSpace} from '../utilities/checkForHorizontalSpace';

import {useShowMoreAnnotationsButton} from './useShowMoreAnnotationsButton';

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
  const {characterWidths} = useChartContext();

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions, hiddenAnnotationsCount} = useMemo(() => {
    let positions = annotations.map((annotation, dataIndex) => {
      const startIndex = annotation.startKey ?? annotation.startAxisLabel ?? 0;

      const xPosition = getValueFromXScale(dataIndexes[startIndex], xScale);

      const textWidth = textWidths[dataIndex];

      const width = clamp({
        amount: textWidth + PILL_PADDING * 2,
        min: textWidth + PILL_PADDING * 2,
        max: drawableWidth,
      });

      const rawX = clamp({
        amount: xPosition,
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

    checkForHorizontalSpace({positions, totalRows: 1});

    positions.forEach((current) => {
      const row = current.row - 1;
      current.y = row * PILL_HEIGHT + row * PILL_ROW_GAP;
    });

    const hiddenAnnotationsCount = positions.filter(
      ({row}) => row >= COLLAPSED_ANNOTATIONS_COUNT,
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

  const {totalRowHeight, rowCount} = useShowMoreAnnotationsButton({
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
