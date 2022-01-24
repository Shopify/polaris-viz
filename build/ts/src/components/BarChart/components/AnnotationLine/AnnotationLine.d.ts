/// <reference types="react" />
import type { Direction } from 'types';
import type { Annotation } from '../../types';
export interface AnnotationLineProps extends Omit<Annotation, 'dataPointIndex' | 'dataSeriesIndex'> {
    position: number;
    barSize: number;
    drawableSize: number;
    shouldAnimate?: boolean;
    direction?: Direction;
}
export declare function AnnotationLine({ barSize, color, direction, drawableSize, offset, position, shouldAnimate, width: annotationWidth, }: AnnotationLineProps): JSX.Element;
//# sourceMappingURL=AnnotationLine.d.ts.map