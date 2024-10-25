import {classNames} from '../../../utilities';
import styles from '../Grid.scss';

interface AxisLabelProps {
  x: number;
  y: number;
  textAnchor: 'start' | 'end';
  dominantBaseline: 'hanging' | 'bottom';
  label: string;
  animationDelay: string;
  isAnimated: boolean;
}

export const AxisLabel: React.FC<AxisLabelProps> = ({
  x,
  y,
  textAnchor,
  dominantBaseline,
  label,
  animationDelay,
  isAnimated,
}) => (
  <text
    x={x}
    y={y}
    textAnchor={textAnchor}
    dominantBaseline={dominantBaseline}
    fontSize="12"
    fill="#B5B5B5"
    className={classNames(styles.Label, isAnimated && styles.FadeInLabel)}
    style={isAnimated ? {animationDelay} : undefined}
  >
    {label}
  </text>
);
