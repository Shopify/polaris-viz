import React from 'react';
import type { PartialTheme } from 'types';
export declare const mountWithProvider: (child: React.ReactElement<any, any>, providerValues?: {
    themes: {
        [key: string]: PartialTheme;
    };
} | undefined) => import("@shopify/react-testing").Root<any>;
export declare const mockDefaultTheme: (overrides: PartialTheme) => {
    themes: {
        Default: PartialTheme;
    };
};
//# sourceMappingURL=mount-with-provider.d.ts.map