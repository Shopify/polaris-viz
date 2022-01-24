import { ReactNode } from 'react';
import type { Dimensions, Margin } from '../../../types';
import type { TooltipPositionOffset } from '../types';
import type { AlteredPosition } from '../utilities';
export interface TooltipAnimatedContainerProps {
    children: ReactNode;
    margin: Margin;
    activePointIndex: number;
    currentX: number;
    currentY: number;
    chartDimensions: Dimensions;
    getAlteredPosition?: AlteredPosition;
    position?: TooltipPositionOffset;
    id?: string;
    bandwidth?: number;
}
export declare function TooltipAnimatedContainer({ activePointIndex, bandwidth, chartDimensions, children, currentX, currentY, id, getAlteredPosition, margin, position, }: TooltipAnimatedContainerProps): JSX.Element;
//# sourceMappingURL=TooltipAnimatedContainer.d.ts.map