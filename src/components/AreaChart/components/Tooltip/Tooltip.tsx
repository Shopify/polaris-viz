import React from 'react';
import {Color} from 'types';
import {SquareColorPreview} from 'components';

import {TooltipContainer} from '../../../TooltipContainer';
import {Margin} from '../../constants';

import styles from './Tooltip.scss';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisValue(value: number): string;
  chartDimensions: DOMRect;
  data: {[key: string]: number}[];
  colors: Color[];
  totalMessage?: string;
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
  chartDimensions,
  totalMessage,
  data,
  colors,
}: Props) {
  const activePoint = data[activePointIndex];

  const labels = Object.keys(activePoint);
  const values = Object.values(activePoint);
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
        {labels.map((label, index) => (
          <React.Fragment key={`${label}-${index}`}>
            <SquareColorPreview color={colors[index]} />
            <p className={styles.SeriesName}>{label}</p>
            <p className={styles.Value}>{formatYAxisValue(values[index])}</p>
          </React.Fragment>
        ))}
        {totalMessage == null ? null : (
          <React.Fragment>
            <div />
            <p className={styles.SeriesName}>{totalMessage}</p>
            <p className={styles.Value}>{formatYAxisValue(total)}</p>
          </React.Fragment>
        )}
      </div>
    </TooltipContainer>
  );
}
