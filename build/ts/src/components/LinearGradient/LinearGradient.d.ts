/// <reference types="react" />
import type { GradientStop } from '../../types';
export interface LinearGradientProps {
    gradient: GradientStop[];
    id: string;
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
    gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
}
export declare function LinearGradient({ gradient, id, x1, x2, y1, y2, gradientUnits, }: LinearGradientProps): JSX.Element;
//# sourceMappingURL=LinearGradient.d.ts.map