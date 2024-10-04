import {Fragment} from 'react';
import type {DataPoint, YAxisOptions} from '@shopify/polaris-viz-core';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {TooltipContentContainer, TooltipTitle} from '../../../TooltipContent';

import styles from './Tooltip.scss';

export interface TooltipContentProps {
  activeIndex: number;
  dataSeries: DataPoint[];
  percentages: string[];
  yAxisOptions: Required<YAxisOptions>;
}

const MAX_WIDTH = 300;

export function SmallTooltip({
  activeIndex,
  dataSeries,
  percentages,
  yAxisOptions,
}: TooltipContentProps) {
  const point = dataSeries[activeIndex];

  return (
    <TooltipContentContainer maxWidth={MAX_WIDTH} theme={DEFAULT_THEME_NAME}>
      {() => (
        <Fragment>
          <TooltipTitle theme={DEFAULT_THEME_NAME}>{point.key}</TooltipTitle>
          <div className={styles.RowSmall}>
            <span className={styles.Percent}>{percentages[activeIndex]}</span>
            <span className={styles.Value}>
              {yAxisOptions.labelFormatter(point.value)}
            </span>
          </div>
        </Fragment>
      )}
    </TooltipContentContainer>
  );
}
