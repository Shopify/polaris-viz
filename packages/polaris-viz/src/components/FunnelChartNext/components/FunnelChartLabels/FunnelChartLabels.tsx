import type {ReactNode} from 'react';
import {Fragment, useMemo, useState} from 'react';
import type {ScaleBand} from 'd3-scale';
import {estimateStringWidth, useChartContext} from '@shopify/polaris-viz-core';

import {getTrendIndicatorData} from '../../../../utilities/getTrendIndicatorData';
import {TrendIndicator} from '../../../TrendIndicator';
import type {FunnelChartMetaData} from '../../types';
import {LINE_HEIGHT} from '../../../../constants';
import {estimateStringWidthWithOffset} from '../../../../utilities';
import {SingleTextLine} from '../../../Labels';
import {ScaleIcon} from '../ScaleIcon';
import {ScaleIconTooltip} from '../ScaleIconTooltip';

const LINE_GAP = 5;
const LINE_PADDING = 4;
const GROUP_OFFSET = 10;
const LABEL_FONT_SIZE = 12;
const VALUE_FONT_SIZE = 14;
const VALUE_FONT_WEIGHT = 500;
const VALUE_FONT_SIZE_SMALL = 12;
const TREND_INDICATOR_SPACING = 20;
const VERTICAL_STACK_SPACING = 3;
const MIN_CHART_WIDTH_FOR_RULE_3_PRIORITY = 400;
export const LABEL_VERTICAL_OFFSET = 2;
const TREND_INDICATOR_SPACING_ADJUSTMENT = 35;

const TEXT_COLOR = 'rgba(31, 33, 36, 1)';

const REDUCED_FONT_SIZE = 11;

export interface FunnelChartLabelsProps {
  formattedValues: string[];
  labels: string[];
  labelWidth: number;
  barWidth: number;
  percentages: string[];
  trends?: FunnelChartMetaData['trends'];
  xScale: ScaleBand<string>;
  shouldApplyScaling: boolean;
  renderScaleIconTooltipContent?: () => ReactNode;
}

const LAYOUT_STRATEGY = {
  ONE_LINE_ALL: 'one_line_all',
  ONE_LINE_COUNTS_AND_TRENDS: 'one_line_counts_and_trends',
  VERTICAL_STACKING: 'vertical_stacking',
} as const;

export function FunnelChartLabels({
  formattedValues,
  labels,
  labelWidth,
  barWidth,
  percentages,
  trends,
  xScale,
  shouldApplyScaling,
  renderScaleIconTooltipContent,
}: FunnelChartLabelsProps) {
  const {characterWidths, containerBounds} = useChartContext();
  const chartContainerWidth = containerBounds?.width ?? 0;
  const [showTooltip, setShowTooltip] = useState(false);

  const labelFontSize = useMemo(() => {
    const maxLabelWidth = Math.max(
      ...labels.map((label) => estimateStringWidth(label, characterWidths)),
    );
    return maxLabelWidth > labelWidth ? REDUCED_FONT_SIZE : LABEL_FONT_SIZE;
  }, [labels, characterWidths, labelWidth]);

  const {layoutStrategy} = useMemo(() => {
    // Check if all items can fit in one Main Percentage, Counts, and TI (if present) on a single line.
    const canAllFitInOneLine = labels.every((_, i) => {
      const isLast = i === labels.length - 1;
      const currentTargetWidth = isLast
        ? barWidth - GROUP_OFFSET * 2
        : labelWidth - GROUP_OFFSET * 2;
      const currentPercentWidth = estimateStringWidthWithOffset(
        percentages[i],
        VALUE_FONT_SIZE,
        VALUE_FONT_WEIGHT,
      );
      const currentCountStringWidth = estimateStringWidthWithOffset(
        formattedValues[i],
        VALUE_FONT_SIZE,
        VALUE_FONT_WEIGHT,
      );
      const {
        trendIndicatorWidth: currentTrendWidth,
        trendIndicatorProps: currentTrendProps,
      } = getTrendIndicatorData(trends?.[i]?.reached);

      return (
        currentPercentWidth +
          LINE_PADDING +
          currentCountStringWidth +
          (currentTrendProps
            ? TREND_INDICATOR_SPACING + currentTrendWidth
            : 0) <
        currentTargetWidth
      );
    });

    if (canAllFitInOneLine) {
      // All elements in one line
      return {layoutStrategy: LAYOUT_STRATEGY.ONE_LINE_ALL};
    }

    // If chart width is very narrow, prioritize full stacking.
    if (chartContainerWidth < MIN_CHART_WIDTH_FOR_RULE_3_PRIORITY) {
      return {layoutStrategy: LAYOUT_STRATEGY.VERTICAL_STACKING};
    }

    // Check if counts and trends can fit in one line.
    const canCountsAndTrendsFitOneLine = labels.every((_, i) => {
      const isLast = i === labels.length - 1;
      const currentTargetWidth = isLast
        ? barWidth - GROUP_OFFSET * 2
        : labelWidth - GROUP_OFFSET * 2;
      const currentCountStringWidth = estimateStringWidthWithOffset(
        formattedValues[i],
        VALUE_FONT_SIZE,
        VALUE_FONT_WEIGHT,
      );
      const {
        trendIndicatorWidth: currentTrendWidth,
        trendIndicatorProps: currentTrendProps,
      } = getTrendIndicatorData(trends?.[i]?.reached);

      return (
        currentCountStringWidth +
          (currentTrendProps
            ? TREND_INDICATOR_SPACING + currentTrendWidth
            : 0) <
        Number(currentTargetWidth) + TREND_INDICATOR_SPACING_ADJUSTMENT
      );
    });

    if (canCountsAndTrendsFitOneLine) {
      return {layoutStrategy: LAYOUT_STRATEGY.ONE_LINE_COUNTS_AND_TRENDS};
    }

    // Fall back to vertical stacking.
    return {layoutStrategy: LAYOUT_STRATEGY.VERTICAL_STACKING};
  }, [
    labels,
    percentages,
    formattedValues,
    trends,
    labelWidth,
    barWidth,
    chartContainerWidth,
  ]);

  function displayChartLabels(
    layoutStrategy: typeof LAYOUT_STRATEGY[keyof typeof LAYOUT_STRATEGY],
    index: number,
    currentTargetWidth: number,
    percentWidth: number,
    countStringWidth: number,
    trendIndicatorProps: any,
    trendIndicatorWidth: number,
  ) {
    if (layoutStrategy === LAYOUT_STRATEGY.ONE_LINE_ALL) {
      return (
        <Fragment>
          <SingleTextLine
            color={TEXT_COLOR}
            text={percentages[index]}
            targetWidth={percentWidth}
            textAnchor="start"
            fontSize={VALUE_FONT_SIZE}
            fontWeight={VALUE_FONT_WEIGHT}
          />
          <SingleTextLine
            color={TEXT_COLOR}
            text={formattedValues[index]}
            x={percentWidth + LINE_PADDING}
            targetWidth={
              currentTargetWidth -
              (percentWidth + LINE_PADDING) -
              (trendIndicatorProps
                ? TREND_INDICATOR_SPACING + trendIndicatorWidth
                : 0)
            }
            textAnchor="start"
            fontSize={VALUE_FONT_SIZE}
            fontWeight={VALUE_FONT_WEIGHT}
          />
          {trendIndicatorProps && (
            <g
              transform={`translate(${
                percentWidth + countStringWidth + TREND_INDICATOR_SPACING
              }, ${-LABEL_VERTICAL_OFFSET})`}
            >
              <TrendIndicator {...trendIndicatorProps} />
            </g>
          )}
        </Fragment>
      );
    }

    if (layoutStrategy === LAYOUT_STRATEGY.ONE_LINE_COUNTS_AND_TRENDS) {
      return (
        <Fragment>
          <SingleTextLine
            color={TEXT_COLOR}
            text={percentages[index]}
            targetWidth={currentTargetWidth}
            textAnchor="start"
            fontSize={VALUE_FONT_SIZE}
            fontWeight={VALUE_FONT_WEIGHT}
          />
          <g
            transform={`translate(0, ${LINE_HEIGHT + VERTICAL_STACK_SPACING})`}
          >
            <SingleTextLine
              color={TEXT_COLOR}
              text={formattedValues[index]}
              targetWidth={
                trendIndicatorProps ? countStringWidth : currentTargetWidth
              }
              textAnchor="start"
              fontSize={VALUE_FONT_SIZE_SMALL}
              fontWeight={VALUE_FONT_WEIGHT}
              x={0}
              y={2}
            />
            {trendIndicatorProps && (
              <g
                transform={`translate(${countStringWidth}, ${-LABEL_VERTICAL_OFFSET})`}
              >
                <TrendIndicator {...trendIndicatorProps} />
              </g>
            )}
          </g>
        </Fragment>
      );
    }

    if (layoutStrategy === LAYOUT_STRATEGY.VERTICAL_STACKING) {
      return (
        <Fragment>
          <SingleTextLine
            color={TEXT_COLOR}
            text={percentages[index]}
            targetWidth={currentTargetWidth}
            textAnchor="start"
            fontSize={VALUE_FONT_SIZE}
            fontWeight={VALUE_FONT_WEIGHT}
          />
          <g
            transform={`translate(0, ${LINE_HEIGHT + VERTICAL_STACK_SPACING})`}
          >
            <SingleTextLine
              color={TEXT_COLOR}
              text={formattedValues[index]}
              targetWidth={currentTargetWidth}
              textAnchor="start"
              fontSize={VALUE_FONT_SIZE}
              fontWeight={VALUE_FONT_WEIGHT}
              x={0}
            />
          </g>
          {trendIndicatorProps && (
            <g
              transform={`translate(0, ${
                LINE_HEIGHT * 2 + VERTICAL_STACK_SPACING * 2
              })`}
            >
              <g transform={`translate(0, ${-LABEL_VERTICAL_OFFSET})`}>
                <TrendIndicator {...trendIndicatorProps} />
              </g>
            </g>
          )}
        </Fragment>
      );
    }

    return null;
  }

  return (
    <Fragment>
      {labels.map((label, index) => {
        const x = xScale(index.toString()) ?? 0;
        const showScaleIcon = index === 0 && shouldApplyScaling;
        const isLast = index === labels.length - 1;

        const currentTargetWidth = isLast
          ? barWidth - GROUP_OFFSET * 2
          : labelWidth - GROUP_OFFSET * 2;

        const percentWidth = estimateStringWidthWithOffset(
          percentages[index],
          VALUE_FONT_SIZE,
          VALUE_FONT_WEIGHT,
        );

        const countStringWidth = estimateStringWidthWithOffset(
          formattedValues[index],
          VALUE_FONT_SIZE,
          VALUE_FONT_WEIGHT,
        );

        const {trendIndicatorProps, trendIndicatorWidth} =
          getTrendIndicatorData(trends?.[index]?.reached);

        return (
          <g
            transform={`translate(${
              index === 0 ? x : x + GROUP_OFFSET
            },${GROUP_OFFSET})`}
            key={index}
          >
            {showScaleIcon && (
              <g
                transform="translate(0, -3)"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <ScaleIcon />
                {showTooltip && renderScaleIconTooltipContent && (
                  <ScaleIconTooltip
                    renderScaleIconTooltipContent={
                      renderScaleIconTooltipContent
                    }
                  />
                )}
              </g>
            )}
            <SingleTextLine
              color={TEXT_COLOR}
              text={label}
              targetWidth={currentTargetWidth}
              textAnchor="start"
              fontSize={labelFontSize}
              x={showScaleIcon ? 20 : 0}
            />

            <g transform={`translate(0,${LINE_HEIGHT + LINE_GAP})`}>
              {displayChartLabels(
                layoutStrategy,
                index,
                currentTargetWidth,
                percentWidth,
                countStringWidth,
                trendIndicatorProps,
                trendIndicatorWidth,
              )}
            </g>
          </g>
        );
      })}
    </Fragment>
  );
}
