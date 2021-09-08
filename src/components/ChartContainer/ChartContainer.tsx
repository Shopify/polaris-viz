import React, {forwardRef, ReactNode} from 'react';

import {useTheme} from '../../hooks';

import styles from './ChartContainer.scss';

interface Props {
  children: ReactNode;
  theme?: string;
  ref?: (node: HTMLElement | null) => void;
}

export const ChartContainer = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {chartContainer} = useTheme(props.theme);
    return (
      <div
        className={styles.ChartContainer}
        style={{
          background: chartContainer.backgroundColor,
          padding: chartContainer.padding,
          borderRadius: chartContainer.borderRadius,
        }}
        ref={ref}
      >
        {props.children}
      </div>
    );
  },
);

ChartContainer.displayName = 'ChartContainer';
