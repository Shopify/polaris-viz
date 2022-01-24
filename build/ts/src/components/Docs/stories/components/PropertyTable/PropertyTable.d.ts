import { ReactChildren } from 'react';
export declare function PropertyTable({ children, global, }: {
    children: ReactChildren;
    global: boolean;
}): JSX.Element;
export declare namespace PropertyTable {
    var Row: ({ property, type, description, chartsAffected, }: {
        property: string;
        type: string | string[];
        description: string;
        chartsAffected?: string[] | undefined;
    }) => JSX.Element;
}
//# sourceMappingURL=PropertyTable.d.ts.map