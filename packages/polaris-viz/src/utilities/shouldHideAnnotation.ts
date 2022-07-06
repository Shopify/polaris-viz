import {COLLAPSED_ANNOTATIONS_COUNT} from '../constants';

export function shouldHideAnnotation({
  row,
  isShowingAllAnnotations,
  rowCount,
}: {
  row: number;
  isShowingAllAnnotations: boolean;
  rowCount: number;
}) {
  if (isShowingAllAnnotations) {
    return false;
  }

  if (rowCount === COLLAPSED_ANNOTATIONS_COUNT) {
    return false;
  }

  if (
    rowCount > COLLAPSED_ANNOTATIONS_COUNT &&
    row > COLLAPSED_ANNOTATIONS_COUNT - 1
  ) {
    return true;
  }

  return false;
}
