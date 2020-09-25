import React from 'react';
import {TooltipContainer} from 'components/TooltipContainer';
import {Margin} from 'components/LineChart/constants';
import {Series} from 'components/LineChart/types';

import {LinePreview} from '../LinePreview';

import styles from './Tooltip.scss';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisValue(value: number): string;
  series: Series[];
  chartDimensions: DOMRect;
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
  series,
  chartDimensions,
}: Props) {
  return (
    <TooltipContainer
      activePointIndex={activePointIndex}
      currentX={currentX}
      currentY={currentY}
      chartDimensions={chartDimensions}
      margin={Margin}
    >
      <div className={styles.Container}>
        {series.map(({name, data, formatY, style = {}}) => {
          const point = data[activePointIndex];

          if (point == null) {
            return null;
          }

          const {color = 'colorPurple', lineStyle = 'solid'} = style;
          const formattedYValue =
            formatY == null
              ? formatYAxisValue(point.rawValue)
              : formatY(point.rawValue);

          return (
            <React.Fragment key={name}>
              <LinePreview color={color} lineStyle={lineStyle} />
              <p className={styles.SeriesName}>{point.label}</p>
              <p className={styles.Value}>{formattedYValue}</p>
            </React.Fragment>
          );
        })}
      </div>
    </TooltipContainer>
  );
}
