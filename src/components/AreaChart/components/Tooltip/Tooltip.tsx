import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

import {TooltipContainer} from '../../../TooltipContainer';
import {Margin} from '../../constants';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisValue(value: number): string;
  chartDimensions: DOMRect;
  data: {
    x: string;
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

  return (
    <TooltipContainer
      activePointIndex={activePointIndex}
      currentX={currentX}
      currentY={currentY}
      chartDimensions={chartDimensions}
      margin={Margin}
    >
      <div>
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
            <strong>{dataCategories[index]}</strong>
            <div>{formatYAxisValue(value)}</div>
          </React.Fragment>
        ))}
      </div>
    </TooltipContainer>
  );
}
