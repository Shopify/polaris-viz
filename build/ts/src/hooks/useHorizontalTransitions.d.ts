import { SpringValue } from '@react-spring/web';
import type { DataSeries } from '../types';
export interface HorizontalTransitionStyle {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
}
interface Props {
    series: DataSeries[];
    groupHeight: number;
    isAnimated: boolean;
}
export declare function useHorizontalTransitions({ series, groupHeight, isAnimated, }: Props): {
    transitions: import("@react-spring/web").TransitionFn<{
        key: string;
        index: number;
    }, {}>;
};
export {};
//# sourceMappingURL=useHorizontalTransitions.d.ts.map