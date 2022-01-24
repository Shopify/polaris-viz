import type { DataSeries } from 'types';
import type { StackSeries } from '../types';
export declare function getMinMax({ stackedValues, data, integersOnly, }: {
    stackedValues: StackSeries[] | null;
    data: DataSeries[];
    integersOnly: boolean;
}): {
    min: number;
    max: number;
};
//# sourceMappingURL=get-min-max.d.ts.map