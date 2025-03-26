import {Fragment} from 'react';
import type {Color, DataPoint, LabelFormatter} from '@shopify/polaris-viz-core';
import {DEFAULT_THEME_NAME, useTheme} from '@shopify/polaris-viz-core';

import {getTrendIndicatorData} from '../../../../utilities/getTrendIndicatorData';
import type {FunnelChartMetaData} from '../../types';
import {TOOLTIP_WIDTH} from '../../constants';
import {FUNNEL_CHART_CONNECTOR_GRADIENT} from '../../../shared/FunnelChartConnector';
import {FUNNEL_CHART_SEGMENT_FILL} from '../../../shared/FunnelChartSegment';
import {SeriesIcon} from '../../../shared/SeriesIcon';
import {calculateDropOff} from '../../utilities/calculate-dropoff';
import {TooltipContentContainer, TooltipTitle} from '../../../TooltipContent';
import {TrendIndicator} from '../../../TrendIndicator';

import styles from './Tooltip.scss';

export interface TooltipContentProps {
  activeIndex: number;
  dataSeries: DataPoint[];
  trends: FunnelChartMetaData['trends'];
  tooltipLabels: {
    reached: string;
    dropped: string;
  };
  labelFormatter: LabelFormatter;
  percentageFormatter: (value: number) => string;
}

interface Data {
  key: string;
  value: string;
  color: Color;
  percent: number | null;
}

export function Tooltip({
  activeIndex,
  dataSeries,
  trends,
  tooltipLabels,
  labelFormatter,
  percentageFormatter,
}: TooltipContentProps) {
  const selectedTheme = useTheme(DEFAULT_THEME_NAME);

  const point = dataSeries[activeIndex];
  const previousPoint = dataSeries[activeIndex - 1];
  const isFirst = activeIndex === 0;

  const currentValue = point?.value ?? null;
  const previousValue = previousPoint?.value ?? null;
  const hasValidValues = currentValue !== null && previousValue !== null;

  const getDropOffPercent = () => {
    if (isFirst || !hasValidValues) return null;
    return Math.abs(calculateDropOff(previousValue, currentValue));
  };

  const getReachedPercent = (dropOffPercent: number | null) => {
    if (isFirst) return 100;
    if (!hasValidValues) return null;
    return 100 - dropOffPercent!;
  };

  const dropOffPercentage = getDropOffPercent();
  const reachedPercent = getReachedPercent(dropOffPercentage);

  const data: Data[] = [
    {
      key: tooltipLabels.reached,
      value: currentValue === null ? '-' : labelFormatter(currentValue),
      color: FUNNEL_CHART_SEGMENT_FILL,
      percent: reachedPercent,
    },
  ];

  if (!isFirst && hasValidValues) {
    data.push({
      key: tooltipLabels.dropped,
      value: labelFormatter(previousValue - currentValue),
      percent: dropOffPercentage,
      color: FUNNEL_CHART_CONNECTOR_GRADIENT,
    });
  }

  return (
    <TooltipContentContainer
      maxWidth={TOOLTIP_WIDTH}
      minWidth={TOOLTIP_WIDTH}
      theme={DEFAULT_THEME_NAME}
      color={selectedTheme.tooltip.backgroundColor}
    >
      {() => (
        <Fragment>
          <TooltipTitle
            theme={DEFAULT_THEME_NAME}
            color={selectedTheme.tooltip.textColor}
            aria-label={`Step: ${point.key}`}
          >
            {point.key}
          </TooltipTitle>
          <div className={styles.Rows}>
            {data.map(({key, value, color, percent}, index) => {
              const formattedPercent =
                percent === null ? '-' : percentageFormatter(percent);
              const ariaLabel = `${key}: ${value}, ${formattedPercent}`;

              const {trendIndicatorProps} = getTrendIndicatorData(
                index === 0
                  ? trends?.[activeIndex]?.reached
                  : trends?.[activeIndex]?.dropped,
              );

              return (
                <div
                  className={styles.Row}
                  key={`row-${index}-${key}`}
                  aria-label={ariaLabel}
                >
                  <div className={styles.Keys}>
                    <SeriesIcon color={color!} />
                    <span>{key}</span>
                  </div>
                  <div className={styles.Values}>
                    <span>
                      <strong>{value}</strong>
                    </span>
                    <span>
                      <strong>{formattedPercent}</strong>
                    </span>
                    {trendIndicatorProps && (
                      <div className={styles.TrendIndicator}>
                        <TrendIndicator {...trendIndicatorProps} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </TooltipContentContainer>
  );
}
