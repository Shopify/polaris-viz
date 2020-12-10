import React from 'react';
import {Color} from 'types';

import {SquareColorPreview} from '../../../SquareColorPreview';
import {TooltipContainer} from '../../../TooltipContainer';
import {Margin} from '../../constants';

import styles from './Tooltip.scss';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisLabel(value: number): string;
  chartDimensions: DOMRect;
  data: {[key: string]: number}[];
  colors: Color[];
  tooltipSumDescriptor?: string;
  xAxisLabels: string[];
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisLabel,
  chartDimensions,
  tooltipSumDescriptor,
  data,
  colors,
  xAxisLabels,
}: Props) {
  const values = Object.values(data[activePointIndex]);
  const total = values.reduce((acc, value) => acc + value, 0);

  return (
    <TooltipContainer
      activePointIndex={activePointIndex}
      currentX={currentX}
      currentY={currentY}
      chartDimensions={chartDimensions}
      margin={Margin}
    >
      <div className={styles.Container}>
        {values.map((label, index) => (
          <React.Fragment key={`${label}-${index}`}>
            {/* <SquareColorPreview color={colors[index]} /> */}
            <p className={styles.SeriesName}>{xAxisLabels[activePointIndex]}</p>
            <p className={styles.Value}>{formatYAxisLabel(values[index])}</p>
          </React.Fragment>
        ))}
        {tooltipSumDescriptor == null ? null : (
          <React.Fragment>
            <div />
            <p className={styles.SeriesName}>{tooltipSumDescriptor}</p>
            <p className={styles.Value}>{formatYAxisLabel(total)}</p>
          </React.Fragment>
        )}
      </div>
    </TooltipContainer>
  );
}
