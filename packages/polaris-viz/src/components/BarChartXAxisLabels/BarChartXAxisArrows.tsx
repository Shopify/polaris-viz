import React, {Dispatch, SetStateAction} from 'react';

import {useLabels, TextLine} from '../Labels';

const ARROW_WIDTH = 11;
const ARROW_HEIGHT = 9;

export interface BarChartXAxisArrowsProps {
  chartHeight: number;
  onHeightChange: Dispatch<SetStateAction<number>>;
  x: number;
  index: number;
  chartX: number;
  chartY: number;
  labelWidth: number;
  theme?: string;
}

export function BarChartXAxisArrows({
  chartHeight,
  onHeightChange,
  x,
  index,
  chartX,
  chartY,
  labelWidth,
  theme,
}: BarChartXAxisArrowsProps) {
  const {lines} = useLabels({
    labels: ['→'],
    targetWidth: labelWidth,
    onHeightChange,
    chartHeight,
  });
  const firstLine = lines[0];
  const firstLabel = firstLine[0];

  const areLabelsVertical = firstLabel.transform?.includes('rotate(-90)');
  const getArrowTransform = () => {
    if (areLabelsVertical) {
      return `translate(${chartX + x - labelWidth / 2 + ARROW_WIDTH / 2},${
        chartY + ARROW_HEIGHT
      })`;
    }

    return `translate(${chartX - labelWidth + x},${chartY})`;
  };

  const arrowLine = [{...firstLabel, transform: undefined}];

  return (
    <g transform={getArrowTransform()} key={`${index}-arrow`}>
      <TextLine line={arrowLine} index={index} theme={theme} />
    </g>
  );
}
