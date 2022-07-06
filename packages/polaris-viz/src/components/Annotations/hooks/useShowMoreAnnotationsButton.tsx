import {useMemo} from 'react';

import {COLLAPSED_ANNOTATIONS_COUNT} from '../../../constants';
import {isShowMoreAnnotationsButtonVisible} from '../../../utilities/isShowMoreAnnotationsButtonVisible';
import {PILL_HEIGHT, PILL_ROW_GAP, SHOW_MORE_BUTTON_OFFSET} from '../constants';
import type {AnnotationPosition} from '../types';

interface Props {
  isShowingAllAnnotations: boolean;
  positions: AnnotationPosition[];
}

export function useShowMoreAnnotationsButton({
  isShowingAllAnnotations,
  positions,
}: Props) {
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
        if (!isShowingAllAnnotations && row > COLLAPSED_ANNOTATIONS_COUNT) {
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

  return {rowCount, totalRowHeight};
}
