import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

import {TooltipContainer} from '../../../TooltipContainer';
import {Margin} from '../../constants';

import styles from './Tooltip.scss';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisValue(value: number): string;
  chartDimensions: DOMRect;
  data: {
    label: string;
    values: number[];
  }[];
  colors: Color[];
  dataCategories: string[];
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
  chartDimensions,
  data,
  colors,
  dataCategories,
}: Props) {
  const activePoint = data[activePointIndex];

  const totalValue = activePoint.values.reduce(
    (current, accumulator) => current + accumulator,
    0,
  );

  return (
    <TooltipContainer
      activePointIndex={activePointIndex}
      currentX={currentX}
      currentY={currentY}
      chartDimensions={chartDimensions}
      margin={Margin}
    >
      <div className={styles.Container}>
        {activePoint.values.map((value, index) => (
          <React.Fragment key={`${value}-${index}`}>
            {/* make comp to share with legend */}
            <div
              style={{
                background: tokens[colors[index]],
                width: '10px',
                height: '10px',
              }}
            />
            <p className={styles.SeriesName}>{dataCategories[index]}</p>
            <p className={styles.Value}>{formatYAxisValue(value)}</p>
          </React.Fragment>
        ))}
      </div>

      {/* have optional total value prop to return string */}
      <p>{totalValue}</p>
    </TooltipContainer>
  );
}
