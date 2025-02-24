import {Fragment, useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {
  COLOR_VISION_SINGLE_ITEM,
  BORDER_RADIUS,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {TooltipAttrData} from 'components/TooltipWrapper/utilities/getTooltipDataAttr';

import {getTooltipDataAttr} from '../../TooltipWrapper';
import {getFontSize} from '../../../utilities/getFontSize';
import {useWatchColorVisionEvents, useTheme} from '../../../hooks';
import {estimateStringWidthWithOffset, getBarId} from '../../../utilities';
import {
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_BAR_LABEL_OFFSET,
  NEGATIVE_ZERO_LINE_OFFSET,
} from '../../../constants';
import type {FormattedStackedSeries} from '../../../types';
import {getGradientDefId} from '..';
import {ZeroValueLine} from '../ZeroValueLine';
import {Label} from '../Label';
import {LabelWrapper} from '../LabelWrapper';

import {StackedBar} from './components';
import {useStackedGaps} from './hooks';
import {getXPosition} from './utilities';

export interface HorizontalStackedBarsProps {
  activeGroupIndex: number;
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  chartYPosition: number;
  chartXPosition: number;
  containerWidth: number;
  dataKeys: string[];
  groupHeight: number;
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
  chartYPosition,
  chartXPosition,
  containerWidth,
  dataKeys,
  groupHeight,
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
  const {theme, containerBounds} = useChartContext();
  const [activeBarIndex, setActiveBarIndex] = useState(-1);
  const hideGroupLabel = selectedTheme.groupLabel.hide;

  const shouldRenderLabels = checkIfShouldRenderLabels();

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

  const labelWidth = shouldRenderLabels
    ? estimateStringWidthWithOffset(`${label}`, fontSize)
    : 0;

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

  const tooltipX = getTooltipX();

  const tooltipAttrData: TooltipAttrData = {
    index: groupIndex,
    x: tooltipX,
    y:
      containerBounds.y +
      chartYPosition +
      groupHeight * groupIndex +
      groupHeight / 2,
    seriesBounds: {
      x: containerBounds.x + chartXPosition,
      y: containerBounds.y + chartYPosition + groupHeight * groupIndex,
      width: tooltipX,
      height: groupHeight,
    },
  };

  return (
    <g
      style={{
        transform: `translate(0, ${HORIZONTAL_GROUP_LABEL_HEIGHT}px`,
      }}
      aria-hidden="true"
    >
      <rect
        {...getTooltipDataAttr(tooltipAttrData)}
        y={-HORIZONTAL_GROUP_LABEL_HEIGHT}
        height={groupHeight}
        width={containerWidth}
      />

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
                tooltipAttrData={tooltipAttrData}
                width={width}
                x={x}
                zeroPosition={xScale(0)}
              />
            )}
          </Fragment>
        );
      })}
      {shouldRenderLabels && (
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

  function getTooltipX() {
    let tooltipX = containerBounds.x + chartXPosition;
    const stackedWidth = getStackedWidth(stackedValues[groupIndex], xScale);

    if (shouldRenderLabels) {
      tooltipX += groupLabelX + labelWidth;
    } else {
      tooltipX += stackedWidth;
    }

    if (isNegative) {
      tooltipX = containerBounds.x + chartXPosition + xScale(0) - stackedWidth;
    }

    return tooltipX;
  }

  function checkIfShouldRenderLabels() {
    if (isSimple) {
      return true;
    }

    return !hideGroupLabel;
  }
}

function getStackedWidth(stackedValues: FormattedStackedSeries, xScale) {
  let start = 0;
  let end = 0;

  stackedValues.forEach((range) => {
    const [stackStart, stackEnd] = range;
    if (stackStart >= 0 && stackEnd >= 0) {
      if (stackStart < start) {
        start = stackStart;
      }
      if (stackEnd > end) {
        end = stackEnd;
      }
    }
  });

  return Math.abs(xScale(end) - xScale(start));
}
