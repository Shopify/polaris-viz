import React from 'react';
import type {Dimensions} from 'types';

import {DonutChartMargin} from '../../../../constants';
import {TooltipContainer} from '../../../TooltipContainer';

import styles from './DonutTooltip.scss';

export interface DonutTooltipProps {
  label: string;
  value: string;
  activePointIndex: number;
  currentX: number;
  currentY: number;
  chartDimensions: Dimensions;
}

export function DonutTooltip({
  label,
  value,
  activePointIndex,
  currentX,
  currentY,
  chartDimensions: {width, height},
}: DonutTooltipProps) {
  return (
    <TooltipContainer
      activePointIndex={activePointIndex}
      currentX={currentX}
      currentY={currentY}
      chartDimensions={{
        width,
        height,
      }}
      margin={DonutChartMargin}
      position="auto"
    >
      <div className={styles.Container}>
        <div className={styles.Content}>
          <p className={styles.Label}>{label}</p>
          <p className={styles.Value}>{value}</p>
        </div>
      </div>
    </TooltipContainer>
  );
}
