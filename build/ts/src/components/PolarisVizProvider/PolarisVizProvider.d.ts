import React from 'react';
import type { PartialTheme } from '../../types';
export interface PolarisVizProviderProps {
    children: React.ReactNode;
    themes?: {
        [key: string]: PartialTheme;
    };
}
export declare function PolarisVizProvider({ children, themes, }: PolarisVizProviderProps): JSX.Element;
//# sourceMappingURL=PolarisVizProvider.d.ts.map