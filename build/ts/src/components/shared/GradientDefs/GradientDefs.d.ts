/// <reference types="react" />
import type { Color } from '../../../types';
interface GradientDefsProps {
    width: number;
    id: string;
    seriesColors?: Color[];
    theme?: string;
}
export declare function GradientDefs({ id, seriesColors, theme, width, }: GradientDefsProps): JSX.Element;
export declare function getGradientDefId(theme: string | undefined, index: number, id: string): string;
export {};
//# sourceMappingURL=GradientDefs.d.ts.map