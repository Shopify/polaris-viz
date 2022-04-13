import type { Color } from '@shopify/polaris-viz-core';
export declare const getDataPoint: (limit?: number) => number;
export declare const THEME_CONTROL_ARGS: {
    description: string;
    control: {
        type: string;
        options: string[];
    };
};
export declare const getSingleColor: (color: Color) => string;
export declare const TYPE_CONTROL_ARGS: {
    description: string;
    control: {
        type: string;
        options: string[];
    };
};
export declare const DIRECTION_CONTROL_ARGS: {
    description: string;
    control: {
        type: string;
        options: string[];
    };
};
export declare const LEGEND_CONTROL_ARGS: {
    defaultValue: boolean;
    description: string;
};
export declare const X_AXIS_OPTIONS_ARGS: {
    description: string;
    defaultValue: {
        hide: boolean;
        labelFormatter: (value: string) => string;
    };
};
export declare const Y_AXIS_OPTIONS_ARGS: {
    description: string;
    defaultValue: {
        integersOnly: boolean;
        labelFormatter: (value: number) => string;
    };
};
export declare const SKIP_LINK_TEXT_ARGS: {
    description: string;
};
export declare const EMPTY_STATE_TEXT_ARGS: {
    description: string;
};
export declare const DATA_SERIES_ARGS: {
    description: string;
};
export declare const ACCESSIBILITY_LABEL_ARGS: {
    description: string;
};
//# sourceMappingURL=constants.d.ts.map