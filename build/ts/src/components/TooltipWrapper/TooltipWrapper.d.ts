import { ReactNode } from 'react';
import type { DataType, Dimensions, Margin } from '../../types';
import type { TooltipPosition, TooltipPositionParams } from './types';
import type { AlteredPosition } from './utilities';
interface TooltipWrapperProps {
    chartDimensions: Dimensions;
    getMarkup: (index: number) => ReactNode;
    getPosition: (data: TooltipPositionParams) => TooltipPosition;
    margin: Margin;
    parentRef: SVGSVGElement | null;
    focusElementDataType: DataType;
    alwaysUpdatePosition?: boolean;
    bandwidth?: number;
    getAlteredPosition?: AlteredPosition;
    id?: string;
    onIndexChange?: (index: number | null) => void;
}
export declare function TooltipWrapper(props: TooltipWrapperProps): JSX.Element | null;
export {};
//# sourceMappingURL=TooltipWrapper.d.ts.map