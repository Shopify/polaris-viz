import type {ReactNode} from 'react';
import {Fragment} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';

import {TooltipSeriesName} from '../TooltipSeriesName';

import styles from './TooltipSeries.scss';

export interface Props {
  children: ReactNode;
  name?: string;
  templateColumnCount?: number;
}

export function TooltipSeries({
  children,
  templateColumnCount = 2,
  name,
}: Props) {
  const {theme} = useChartContext();

  return (
    <Fragment>
      {name != null && (
        <TooltipSeriesName theme={theme}>{name}</TooltipSeriesName>
      )}
      <div
        className={styles.Series}
        style={{gridTemplateColumns: `repeat(${templateColumnCount}, auto)`}}
      >
        {children}
      </div>
    </Fragment>
  );
}
