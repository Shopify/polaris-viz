/// <reference types="react" />
import type { Color, Direction, Legend } from '../../../../types';
import { ComparisonMetricProps } from '../../../ComparisonMetric';
import type { LabelPosition } from '../../types';
export interface Props {
    label: string;
    value: string;
    color: Color;
    legendColors: Legend;
    direction: Direction;
    labelPosition: LabelPosition;
    comparisonMetric?: Omit<ComparisonMetricProps, 'theme'> | null;
}
export declare function BarLabel({ label, value, color, comparisonMetric, legendColors, direction, labelPosition, }: Props): JSX.Element;
//# sourceMappingURL=BarLabel.d.ts.map