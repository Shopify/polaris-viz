import {Dispatch, SetStateAction, useEffect, useMemo} from 'react';
import {estimateStringWidth, useChartContext} from '@shopify/polaris-viz-core';

import {
  LINE_HEIGHT,
  DIAGONAL_LABEL_MIN_WIDTH,
  HORIZONTAL_LABEL_MIN_WIDTH,
  HORIZONTAL_LABEL_TARGET_HEIGHT,
  VERTICAL_LABEL_MIN_WIDTH,
} from '../../../constants';
import {getDiagonalLabels} from '../utilities/getDiagonalLabels';
import {getHorizontalLabels} from '../utilities/getHorizontalLabels';
import {getVerticalLabels} from '../utilities/getVerticalLabels';

const LABEL_CONTAINER_MAX_PERCENTAGE = 0.25;

interface Props {
  allowLineWrap: boolean;
  chartHeight: number;
  labels: string[];
  targetWidth: number;
  onHeightChange?: Dispatch<SetStateAction<number>> | (() => void);
}

export function useLabels({
  allowLineWrap,
  chartHeight,
  labels,
  onHeightChange = () => {},
  targetWidth,
}: Props) {
  const {characterWidths} = useChartContext();

  const preparedLabels = useMemo(() => {
    return labels.map((label) => {
      return {
        text: label,
        words: [],
        truncatedWords: [],
        truncatedName: '',
        truncatedWidth: 0,
      };
    });
  }, [labels]);

  const longestLabelWidth = useMemo(() => {
    return labels.reduce((prev, string) => {
      const newWidth = estimateStringWidth(string, characterWidths);

      if (newWidth > prev) {
        return newWidth;
      }

      return prev;
    }, 0);
  }, [labels, characterWidths]);

  const maxWidth = Math.floor(chartHeight * LABEL_CONTAINER_MAX_PERCENTAGE);

  const {lines, containerHeight} = useMemo(() => {
    const shouldDrawHorizontal = checkIfShouldDrawHorizontal({
      allowLineWrap,
      longestLabelWidth,
      targetWidth,
    });
    const shouldDrawDiagonal = targetWidth > DIAGONAL_LABEL_MIN_WIDTH;
    const shouldDrawVertical = targetWidth > VERTICAL_LABEL_MIN_WIDTH;

    switch (true) {
      case shouldDrawHorizontal: {
        return getHorizontalLabels({
          labels: preparedLabels,
          targetWidth,
          targetHeight: HORIZONTAL_LABEL_TARGET_HEIGHT,
          characterWidths,
        });
      }
      case shouldDrawDiagonal: {
        return getDiagonalLabels({
          characterWidths,
          labels: preparedLabels,
          maxWidth,
          targetHeight: LINE_HEIGHT,
          targetWidth,
        });
      }
      case shouldDrawVertical: {
        return getVerticalLabels({
          characterWidths,
          labels: preparedLabels,
          maxWidth,
          targetWidth,
        });
      }
      default: {
        return {
          lines: [],
          containerHeight: 0,
        };
      }
    }
  }, [
    allowLineWrap,
    maxWidth,
    targetWidth,
    characterWidths,
    preparedLabels,
    longestLabelWidth,
  ]);

  useEffect(() => {
    onHeightChange(containerHeight);
  }, [containerHeight, onHeightChange]);

  return {lines, containerHeight};
}

function checkIfShouldDrawHorizontal({
  allowLineWrap,
  longestLabelWidth,
  targetWidth,
}: {
  allowLineWrap: boolean;
  longestLabelWidth: number;
  targetWidth: number;
}) {
  const isLabelLongerThanTarget = targetWidth > longestLabelWidth;

  if (allowLineWrap === false) {
    return isLabelLongerThanTarget;
  }

  return targetWidth >= HORIZONTAL_LABEL_MIN_WIDTH || isLabelLongerThanTarget;
}
