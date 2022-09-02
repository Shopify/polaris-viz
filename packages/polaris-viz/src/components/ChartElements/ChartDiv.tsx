import React, {ReactNode} from 'react';

import styles from './ChartElements.scss';

interface ChartDivProps {
  height: number;
  width: number;
  children: ReactNode;
}

export function ChartDiv({children, height, width}: ChartDivProps) {
  return (
    <div className={styles.ChartContainer} style={{height, width}}>
      {children}
    </div>
  );
}
