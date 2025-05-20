import type {Dispatch, SetStateAction} from 'react';
import {useEffect, useMemo} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';

import {getFontSize} from '../../../utilities/getFontSize';
import {estimateStringWidthWithOffset} from '../../../utilities';
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

interface Props {
  allowLineWrap: boolean;
  labels: string[];
  targetWidth: number;
  onHeightChange?: Dispatch<SetStateAction<number>> | (() => void);
  align?: 'center' | 'left';
  activeIndex?: number;
  fillColor?: string;
}

export function useLabels({
  allowLineWrap,
  align = 'center',
  labels,
  onHeightChange = () => {},
  targetWidth,
  activeIndex,
  fillColor,
}: Props) {
  const {characterWidths} = useChartContext();

  const fontSize = getFontSize();

  const preparedLabels = useMemo(() => {
    return labels.map((label) => {
      return {
        text: label,
        fontSize,
        words: [],
        truncatedWords: [],
        truncatedName: '',
        truncatedWidth: 0,
      };
    });
  }, [labels, fontSize]);

  const longestLabelWidth = useMemo(() => {
    return labels.reduce((prev, string) => {
      const newWidth = estimateStringWidthWithOffset(string, fontSize);

      if (newWidth > prev) {
        return newWidth;
      }

      return prev;
    }, 0);
  }, [labels, fontSize]);

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
          align,
          fontSize,
          labels: preparedLabels,
          targetWidth,
          targetHeight: HORIZONTAL_LABEL_TARGET_HEIGHT,
          characterWidths,
          activeIndex,
          fillColor,
        });
      }
      case shouldDrawDiagonal: {
        return getDiagonalLabels({
          characterWidths,
          labels: preparedLabels,
          longestLabelWidth,
          targetHeight: LINE_HEIGHT,
          targetWidth,
          activeIndex,
          fillColor,
        });
      }
      case shouldDrawVertical: {
        return getVerticalLabels({
          characterWidths,
          labels: preparedLabels,
          longestLabelWidth,
          targetWidth,
          activeIndex,
          fillColor,
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
    align,
    allowLineWrap,
    fontSize,
    targetWidth,
    characterWidths,
    preparedLabels,
    longestLabelWidth,
    activeIndex,
    fillColor,
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
