import {useMemo} from 'react';
import {
  clamp,
  estimateStringWidth,
  LINE_HEIGHT,
  useChartContext,
} from '@shopify/polaris-viz-core';

import type {AnnotationPosition} from '../../../../Annotations';
import {PILL_HEIGHT, PILL_PADDING} from '../../../../Annotations';
import type {Annotation} from '../../../../../types';

export interface Props {
  annotations: Annotation[];
  dataIndexes: {[key: string]: number};
  drawableWidth: number;
  groupHeight: number;
  zeroPosition: number;
}

const Y_OFFSET = LINE_HEIGHT / 2;
const LABEL_PADDING = 5;

export function useHorizontalBarChartYAnnotationsPositions({
  annotations,
  dataIndexes,
  groupHeight,
  drawableWidth,
  zeroPosition,
}: Props): {
  positions: AnnotationPosition[];
} {
  const {characterWidths} = useChartContext();

  const textWidths = useMemo(() => {
    return annotations.map((annotation) => {
      return estimateStringWidth(annotation.label, characterWidths);
    });
  }, [annotations, characterWidths]);

  const {positions} = useMemo(() => {
    const positions = annotations.map((annotation, dataIndex) => {
      const rawY: number =
        dataIndexes[annotation.startKey] * groupHeight + Y_OFFSET;

      const textWidth = textWidths[dataIndex];
      const labelWidth = estimateStringWidth(
        `${annotation.startKey}`,
        characterWidths,
      );

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
          x: zeroPosition + labelWidth + LABEL_PADDING,
          y: rawY,
        },
        row: 1,
        width,
        x: drawableWidth - width,
        y,
      };
    });

    return {positions};
  }, [
    annotations,
    dataIndexes,
    groupHeight,
    textWidths,
    drawableWidth,
    characterWidths,
    zeroPosition,
  ]);

  return {
    positions,
  };
}
