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
const PERCENT_FONT_SIZE = 14;
const PERCENT_FONT_WEIGHT = 650;
const VALUE_FONT_SIZE = 13;
const TREND_INDICATOR_SPACING = 8;
export const LABEL_VERTICAL_OFFSET = 2;

const TEXT_COLOR = 'rgba(31, 33, 36, 1)';
const VALUE_COLOR = 'rgba(97, 97, 97, 1)';

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
  const {characterWidths} = useChartContext();
  const [showTooltip, setShowTooltip] = useState(false);

  const labelFontSize = useMemo(() => {
    const maxLabelWidth = Math.max(
      ...labels.map((label) => estimateStringWidth(label, characterWidths)),
    );

    return maxLabelWidth > labelWidth ? REDUCED_FONT_SIZE : LABEL_FONT_SIZE;
  }, [labels, characterWidths, labelWidth]);

  const {canShowAllFormattedValues, canShowAllTrendIndicatorsInline} =
    useMemo(() => {
      return labels.reduce(
        (acc, _, index) => {
          const isLast = index === labels.length - 1;
          const targetWidth = isLast
            ? barWidth - GROUP_OFFSET * 2
            : labelWidth - GROUP_OFFSET * 2;

          const percentWidth = estimateStringWidthWithOffset(
            percentages[index],
            PERCENT_FONT_SIZE,
            PERCENT_FONT_WEIGHT,
          );

          const formattedValueWidth = estimateStringWidthWithOffset(
            formattedValues[index],
            VALUE_FONT_SIZE,
          );

          const {trendIndicatorWidth} = getTrendIndicatorData(
            trends?.[index]?.reached,
          );

          // Check if we can fit percentage + formatted value + trend indicator inline
          const canFitInline =
            percentWidth +
              formattedValueWidth +
              trendIndicatorWidth +
              TREND_INDICATOR_SPACING * 2 <
            targetWidth;

          // Check if we can fit the percentage and formatted value
          const canFitFormattedValue =
            percentWidth + formattedValueWidth + LINE_PADDING < targetWidth;

          return {
            canShowAllFormattedValues:
              acc.canShowAllFormattedValues && canFitFormattedValue,
            canShowAllTrendIndicatorsInline:
              acc.canShowAllTrendIndicatorsInline && canFitInline,
          };
        },
        {
          canShowAllFormattedValues: true,
          canShowAllTrendIndicatorsInline: true,
        },
      );
    }, [labels, barWidth, labelWidth, percentages, formattedValues, trends]);

  return (
    <Fragment>
      {labels.map((label, index) => {
        const x = xScale(index.toString()) ?? 0;
        const showScaleIcon = index === 0 && shouldApplyScaling;
        const isLast = index === labels.length - 1;

        const targetWidth = isLast
          ? barWidth - GROUP_OFFSET * 2
          : labelWidth - GROUP_OFFSET * 2;

        const percentWidth = estimateStringWidthWithOffset(
          percentages[index],
          PERCENT_FONT_SIZE,
          PERCENT_FONT_WEIGHT,
        );

        const {trendIndicatorProps, trendIndicatorWidth} =
          getTrendIndicatorData(trends?.[index]?.reached);

        const trendIndicatorX = canShowAllTrendIndicatorsInline
          ? targetWidth - trendIndicatorWidth
          : 0;

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
              targetWidth={targetWidth}
              textAnchor="start"
              fontSize={labelFontSize}
              x={showScaleIcon ? 20 : 0}
            />

            <g transform={`translate(0,${LINE_HEIGHT + LINE_GAP})`}>
              <SingleTextLine
                color={TEXT_COLOR}
                text={percentages[index]}
                targetWidth={targetWidth}
                textAnchor="start"
                fontSize={PERCENT_FONT_SIZE}
                fontWeight={PERCENT_FONT_WEIGHT}
              />
              {canShowAllFormattedValues && (
                <SingleTextLine
                  color={VALUE_COLOR}
                  text={formattedValues[index]}
                  targetWidth={targetWidth}
                  x={percentWidth + LINE_PADDING}
                  y={1}
                  textAnchor="start"
                  fontSize={VALUE_FONT_SIZE}
                />
              )}
              {trendIndicatorProps && (
                <g
                  transform={`translate(${trendIndicatorX}, ${
                    canShowAllTrendIndicatorsInline
                      ? -LABEL_VERTICAL_OFFSET
                      : LINE_HEIGHT
                  })`}
                >
                  <TrendIndicator {...trendIndicatorProps} />
                </g>
              )}
            </g>
          </g>
        );
      })}
    </Fragment>
  );
}
