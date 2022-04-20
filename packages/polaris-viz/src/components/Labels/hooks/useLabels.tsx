import {Dispatch, SetStateAction, useContext, useEffect, useMemo} from 'react';

import {estimateStringWidth} from '../../../utilities';
import {
  LINE_HEIGHT,
  DIAGONAL_LABEL_MIN_WIDTH,
  HORIZONTAL_LABEL_MIN_WIDTH,
  HORIZONTAL_LABEL_TARGET_HEIGHT,
  VERTICAL_LABEL_MIN_WIDTH,
} from '../../../constants';
import {ChartContext} from '../../ChartContainer';
import {getDiagonalLabels} from '../utilities/getDiagonalLabels';
import {getHorizontalLabels} from '../utilities/getHorizontalLabels';
import {getVerticalLabels} from '../utilities/getVerticalLabels';

const LABEL_CONTAINER_MAX_PERCENTAGE = 0.25;

interface Props {
  chartHeight: number;
  labels: string[];
  targetWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
}

export function useLabels({
  chartHeight,
  labels,
  onHeightChange,
  targetWidth,
}: Props) {
  const {characterWidths} = useContext(ChartContext);

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
    const shouldDrawHorizontal =
      targetWidth >= HORIZONTAL_LABEL_MIN_WIDTH ||
      targetWidth > longestLabelWidth;

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
