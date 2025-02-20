import type {ReactNode} from 'react';
import {Fragment} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';

import {TooltipSeriesName} from '../TooltipSeriesName';

import styles from './TooltipSeries.scss';

export interface Props {
  children: ReactNode;
  columnCount?: number;
  name?: string;
}

export function TooltipSeries({children, columnCount = 2, name}: Props) {
  const {theme} = useChartContext();

  return (
    <Fragment>
      {name != null && (
        <TooltipSeriesName theme={theme}>{name}</TooltipSeriesName>
      )}
      <div
        className={styles.Series}
        style={{gridTemplateColumns: `repeat(${columnCount}, auto)`}}
      >
        {children}
      </div>
    </Fragment>
  );
}
