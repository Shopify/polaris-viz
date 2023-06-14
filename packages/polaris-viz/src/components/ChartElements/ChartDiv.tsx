import type {CSSProperties, ReactNode} from 'react';

import styles from './ChartElements.scss';

interface ChartDivProps {
  height?: number;
  width?: number;
  style?: CSSProperties;
  children: ReactNode;
}

export function ChartDiv({children, height, width, style = {}}: ChartDivProps) {
  return (
    <div className={styles.ChartContainer} style={{height, width, ...style}}>
      {children}
    </div>
  );
}
