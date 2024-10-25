import styles from '../Grid.scss';

interface AxisLabelProps {
  x: number;
  y: number;
  textAnchor: 'start' | 'end';
  dominantBaseline: 'hanging' | 'bottom';
  label: string;
}

export const AxisLabel: React.FC<AxisLabelProps> = ({
  x,
  y,
  textAnchor,
  dominantBaseline,
  label,
}) => (
  <text
    x={x}
    y={y}
    textAnchor={textAnchor}
    dominantBaseline={dominantBaseline}
    fontSize="12"
    fill="#B5B5B5"
    className={styles.Label}
  >
    {label}
  </text>
);
