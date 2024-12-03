import {Fragment, useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {
  COLOR_VISION_SINGLE_ITEM,
  BORDER_RADIUS,
  useChartContext,
  useTheme,
} from '@shopify/polaris-viz-core';

import {getFontSize} from '../../../utilities/getFontSize';
import {useWatchColorVisionEvents} from '../../../hooks/ColorVisionA11y/useWatchColorVisionEvents';
import {estimateStringWidthWithOffset} from '../../../utilities/estimateStringWidthWithOffset';
import {getBarId} from '../../../utilities/getBarId';
import {
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_BAR_LABEL_OFFSET,
  NEGATIVE_ZERO_LINE_OFFSET,
} from '../../../constants';
import type {FormattedStackedSeries} from '../../../types';
import {getGradientDefId} from '../GradientDefs/GradientDefs';
import {ZeroValueLine} from '../ZeroValueLine/ZeroValueLine';
import {Label} from '../Label/Label';
import {LabelWrapper} from '../LabelWrapper/LabelWrapper';

import {StackedBar} from './components/StackedBar/StackedBar';
import {useStackedGaps} from './hooks/useStackedGaps';
import {getXPosition} from './utilities/getXPosition';

export interface HorizontalStackedBarsProps {
  activeGroupIndex: number;
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  dataKeys: string[];
  groupIndex: number;
  id: string;
  name: string;
  stackedValues: FormattedStackedSeries[];
  xScale: ScaleLinear<number, number>;
  labelFormatter: LabelFormatter;
  isSimple: boolean;
  areAllNegative?: boolean;
}

function getBorderRadius({
  lastIndexes,
  seriesIndex,
}: {
  lastIndexes: number[];
  seriesIndex: number;
}) {
  const [positive, negative] = lastIndexes;

  if (positive === seriesIndex) {
    return BORDER_RADIUS.Right;
  }

  if (negative === seriesIndex) {
    return BORDER_RADIUS.Left;
  }

  return BORDER_RADIUS.None;
}

export function HorizontalStackedBars({
  activeGroupIndex,
  animationDelay,
  barHeight,
  dataKeys,
  groupIndex,
  id,
  name,
  stackedValues,
  xScale,
  areAllNegative,
  isSimple,
  labelFormatter,
}: HorizontalStackedBarsProps) {
  const selectedTheme = useTheme();
  const {theme} = useChartContext();
  const [activeBarIndex, setActiveBarIndex] = useState(-1);
  const hideGroupLabel = selectedTheme.groupLabel.hide;

  const fontSize = getFontSize();

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (activeGroupIndex === -1 || activeGroupIndex === groupIndex) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  const lastIndexes = useMemo(() => {
    let lastPos = -1;
    let lastNeg = -1;

    stackedValues[groupIndex].forEach(([start, end], index) => {
      if (start < 0) {
        lastNeg = index;
      }

      if (end > 0) {
        lastPos = index;
      }
    });

    return [lastPos, lastNeg];
  }, [groupIndex, stackedValues]);

  const gaps = useStackedGaps({stackedValues, groupIndex});

  const groupSum = stackedValues[groupIndex].reduce((_, item) => {
    if (item.data) {
      return Object.values(item.data).reduce((sum, value) => sum + value, 0);
    }
    return 0;
  }, 0);

  const isNegative = groupSum && groupSum < 0;
  const label = labelFormatter(groupSum);

  const labelWidth = estimateStringWidthWithOffset(`${label}`, fontSize);

  const minGroupStartPoint = stackedValues[groupIndex].reduce((min, item) => {
    const start = item[0];
    return start < min ? start : min;
  }, Number.MAX_SAFE_INTEGER);

  const maxGroupEndPoint = stackedValues[groupIndex].reduce((max, item) => {
    const end = item[1];
    return end > max ? end : max;
  }, -Number.MAX_SAFE_INTEGER);

  const groupLabelX = isNegative
    ? xScale(minGroupStartPoint) - labelWidth - HORIZONTAL_BAR_LABEL_OFFSET
    : xScale(maxGroupEndPoint) + HORIZONTAL_BAR_LABEL_OFFSET;

  return (
    <g
      style={{
        transform: `translate(0, ${HORIZONTAL_GROUP_LABEL_HEIGHT}px`,
      }}
      aria-hidden="true"
    >
      {stackedValues[groupIndex].map((item, seriesIndex) => {
        const [start, end] = item;

        const barId = getBarId(id, groupIndex, seriesIndex);
        const width = Math.abs(xScale(end) - xScale(start));
        const borderRadius = getBorderRadius({
          lastIndexes,
          seriesIndex,
        });

        const x = getXPosition({start, end, seriesIndex, gaps, xScale});
        const key = dataKeys[seriesIndex] ?? '';
        const ariaLabel = `${key} ${end}`;

        const areAllValuesZero = stackedValues[groupIndex].every(
          ([start, end]) => start + end === 0,
        );

        return (
          <Fragment key={`stackedBar ${barId}`}>
            {areAllValuesZero ? (
              <ZeroValueLine
                x={areAllNegative ? x - NEGATIVE_ZERO_LINE_OFFSET : x}
                y={barHeight / 2}
                direction="horizontal"
              />
            ) : (
              <StackedBar
                animationDelay={animationDelay}
                activeBarIndex={activeBarIndex}
                ariaLabel={ariaLabel}
                borderRadius={borderRadius}
                color={getGradientDefId(theme, seriesIndex, id)}
                height={barHeight}
                key={`${name}${barId}`}
                seriesIndex={seriesIndex}
                setActiveBarIndex={setActiveBarIndex}
                width={width}
                x={x}
                zeroPosition={xScale(0)}
              />
            )}
          </Fragment>
        );
      })}
      {!isSimple && !hideGroupLabel && (
        <LabelWrapper animationDelay={animationDelay} x={groupLabelX}>
          <Label
            barHeight={barHeight}
            color={selectedTheme.xAxis.labelColor}
            fontSize={fontSize}
            label={label}
            labelWidth={labelWidth}
            y={0}
          />
        </LabelWrapper>
      )}
    </g>
  );
}
