import type {Color} from '@shopify/polaris-viz-core';

import type {Annotation} from '../../types';

export interface AnnotationPosition {
  index: number;
  left: number;
  lineX: number;
  right: number;
  row: number;
  width: number;
  y: number;
}

export interface AnnotationLine {
  color: Color;
  height: number;
  x: number;
  y: number;
}

export interface AnnotationsWithData extends Annotation {
  line: AnnotationLine;
  position: AnnotationPosition;
}
