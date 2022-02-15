import {Dispatch, SetStateAction, useContext, useEffect, useMemo} from 'react';

import {
  LINE_HEIGHT,
  DIAGONAL_LABEL_MIN_WIDTH,
  HORIZONTAL_LABEL_MIN_WIDTH,
  HORIZONTAL_LABEL_TARGET_HEIGHT,
} from '../../../constants';
import {ChartContext} from '../../ChartContainer';
import {getDiagonalLabels} from '../utilities/get-diagonal-labels';
import {getHorizontalLabels} from '../utilities/get-horizontal-labels';
import {getVerticalLabels} from '../utilities/get-vertical-labels';

interface Props {
  labels: string[];
  targetWidth: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
}

export function useLabels({labels, targetWidth, onHeightChange}: Props) {
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

  const {lines, containerHeight} = useMemo(() => {
    const shouldDrawHorizontal = targetWidth > HORIZONTAL_LABEL_MIN_WIDTH;
    const shouldDrawDiagonal = targetWidth > DIAGONAL_LABEL_MIN_WIDTH;
    const shouldDrawVertical = targetWidth > LINE_HEIGHT;

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
          labels: preparedLabels,
          targetWidth,
          targetHeight: LINE_HEIGHT,
          characterWidths,
        });
      }
      case shouldDrawVertical: {
        return getVerticalLabels({
          labels: preparedLabels,
          characterWidths,
        });
      }
      default: {
        return {
          lines: [],
          containerHeight: 0,
        };
      }
    }
  }, [targetWidth, characterWidths, preparedLabels]);

  useEffect(() => {
    onHeightChange(containerHeight);
  }, [containerHeight, onHeightChange]);

  return {lines, containerHeight};
}
