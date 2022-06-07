import {shouldHideAnnotation} from './shouldHideAnnotation';

export function isShowMoreAnnotationsButtonVisible(rowCount: number) {
  return shouldHideAnnotation({
    row: 3,
    isShowingAllAnnotations: false,
    rowCount,
  });
}
