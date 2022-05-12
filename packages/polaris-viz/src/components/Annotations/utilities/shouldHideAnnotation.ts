import {COLLAPSED_PILL_COUNT} from '../constants';

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

  if (rowCount === COLLAPSED_PILL_COUNT) {
    return false;
  }

  if (rowCount > COLLAPSED_PILL_COUNT && row > COLLAPSED_PILL_COUNT - 1) {
    return true;
  }

  return false;
}
