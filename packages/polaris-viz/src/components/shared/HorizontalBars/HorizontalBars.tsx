import {Fragment, useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  getColorVisionEventAttrs,
  COLOR_VISION_SINGLE_ITEM,
  useChartContext,
  clamp,
} from '@shopify/polaris-viz-core';

import {getHighestValueIndexForSeries} from '../../../utilities/getHighestValueForSeries';
import {getTooltipDataAttr} from '../../TooltipWrapper';
import {getFontSize} from '../../../utilities/getFontSize';
import {getTrendIndicatorData} from '../../../utilities/getTrendIndicatorData';
import {TREND_INDICATOR_HEIGHT, TrendIndicator} from '../../TrendIndicator';
import {
  estimateStringWidthWithOffset,
  getHoverZoneOffset,
} from '../../../utilities';
import {
  HORIZONTAL_BAR_LABEL_OFFSET,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../../../constants';
import {useTheme, useWatchColorVisionEvents} from '../../../hooks';
import {getGradientDefId} from '../GradientDefs';
import {Label} from '../Label';
import {LabelWrapper} from '../LabelWrapper';
import {Bar} from '../Bar';

import styles from './HorizontalBars.scss';

const SERIES_DELAY = 150;

export interface HorizontalBarsProps {
  activeGroupIndex: number;
  barHeight: number;
  chartYPosition: number;
  chartXPosition: number;
  data: DataSeries[];
  groupIndex: number;
  groupHeight: number;
  id: string;
  isSimple: boolean;
  labelFormatter: LabelFormatter;
  name: string;
  xScale: ScaleLinear<number, number>;
  zeroPosition: number;
  containerWidth: number;
  animationDelay?: number;
  areAllNegative?: boolean;
}

export function HorizontalBars({
  activeGroupIndex,
  animationDelay = 0,
  barHeight,
  chartYPosition,
  chartXPosition,
  data,
  groupHeight,
  groupIndex,
  id,
  isSimple,
  labelFormatter,
  name,
  xScale,
  zeroPosition,
  containerWidth,
  areAllNegative,
}: HorizontalBarsProps) {
  const selectedTheme = useTheme();
  const {theme, containerBounds} = useChartContext();

  const fontSize = getFontSize();

  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (activeGroupIndex === -1 || activeGroupIndex === groupIndex) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  const highestValueIndexForSeries = useMemo(() => {
    return getHighestValueIndexForSeries(data);
  }, [data]);

  const {tooltipX} = getBarAndLabelBounds({
    seriesIndex: highestValueIndexForSeries[groupIndex] ?? -1,
  });

  const tooltipDataAttr = getTooltipDataAttr({
    index: groupIndex,
    x: containerBounds.x + chartXPosition + tooltipX,
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
  });

  return (
    <g
      transform={`translate(${zeroPosition},${HORIZONTAL_GROUP_LABEL_HEIGHT})`}
      aria-hidden="true"
    >
      <rect
        {...tooltipDataAttr}
        x={-zeroPosition}
        y={-HORIZONTAL_GROUP_LABEL_HEIGHT}
        height={groupHeight}
        width={containerWidth}
      />

      {data.map((_, seriesIndex) => {
        if (data[seriesIndex].data[groupIndex] == null) {
          return;
        }

        const seriesAnimationDelay =
          animationDelay + SERIES_DELAY * seriesIndex;

        const {value} = data[seriesIndex].data[groupIndex];

        if (value == null) {
          return null;
        }

        const ariaLabel = `${
          data[seriesIndex] ? data[seriesIndex].name : ''
        } ${value}`;

        const {
          barWidth,
          isNegative,
          label,
          labelWidth,
          labelX,
          trendIndicatorProps,
        } = getBarAndLabelBounds({seriesIndex});

        const y =
          barHeight * seriesIndex +
          HORIZONTAL_SPACE_BETWEEN_SINGLE * seriesIndex;

        const {clampedSize} = getHoverZoneOffset({
          barSize: barWidth,
          zeroPosition: xScale(0),
          max: containerWidth,
          position: 'horizontal',
        });

        const trendYOffset = (barHeight - TREND_INDICATOR_HEIGHT) / 2;

        return (
          <Fragment key={`series-${seriesIndex}-${id}-${name}`}>
            <Bar
              animationDelay={seriesAnimationDelay}
              areAllNegative={areAllNegative}
              color={`url(#${getGradientDefId(theme, seriesIndex, id)})`}
              height={barHeight}
              index={groupIndex}
              isActive={activeBarIndex === -1 || activeBarIndex === seriesIndex}
              transform={isNegative ? 'scaleX(-1)' : ''}
              width={barWidth}
              x={0}
              y={y}
            />
            {isSimple && (
              <LabelWrapper animationDelay={seriesAnimationDelay} x={labelX}>
                <Label
                  barHeight={barHeight}
                  color={selectedTheme.xAxis.labelColor}
                  fontSize={fontSize}
                  label={label ?? ''}
                  labelWidth={labelWidth}
                  y={y}
                />
                {trendIndicatorProps != null && (
                  <g
                    transform={`translate(${
                      labelWidth + HORIZONTAL_BAR_LABEL_OFFSET
                    }, ${y + trendYOffset})`}
                  >
                    <TrendIndicator {...trendIndicatorProps} />
                  </g>
                )}
              </LabelWrapper>
            )}
            <rect
              className={styles.Bar}
              x={0}
              y={y - HORIZONTAL_SPACE_BETWEEN_SINGLE / 2}
              width={clampedSize}
              height={barHeight + HORIZONTAL_SPACE_BETWEEN_SINGLE}
              fill="transparent"
              style={{transform: isNegative ? 'scaleX(-1)' : ''}}
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index: seriesIndex,
              })}
              {...tooltipDataAttr}
              tabIndex={-1}
              role="img"
              aria-label={ariaLabel}
            />
          </Fragment>
        );
      })}
    </g>
  );

  function getBarAndLabelBounds({seriesIndex}: {seriesIndex: number}) {
    const series = data[seriesIndex];

    if (series == null) {
      return {
        barWidth: 0,
        isNegative: false,
        label: null,
        labelWidth: 0,
        labelX: 0,
        trendIndicatorProps: null,
        tooltipX: 0,
      };
    }

    const {value} = data[seriesIndex].data[groupIndex];

    const isNegative = value && value < 0;

    const label = isSimple ? labelFormatter(value) : null;
    const labelWidth = isSimple
      ? estimateStringWidthWithOffset(`${label}`, fontSize)
      : 0;

    const {trendIndicatorProps, trendIndicatorWidth} = getTrendIndicatorData(
      data[seriesIndex]?.metadata?.trends[groupIndex],
    );

    const width = Math.abs(xScale(value ?? 0) - xScale(0));

    const itemSpacing =
      trendIndicatorProps == null
        ? HORIZONTAL_BAR_LABEL_OFFSET
        : HORIZONTAL_BAR_LABEL_OFFSET * 2;

    const leftLabelOffset = isSimple
      ? labelWidth + itemSpacing + trendIndicatorWidth
      : 0;

    const clampedWidth = clamp({
      amount: width,
      min: 1,
    });

    let labelX = clampedWidth + HORIZONTAL_BAR_LABEL_OFFSET;
    let barWidth = clampedWidth;

    if (areAllNegative || isNegative) {
      labelX = -(clampedWidth + leftLabelOffset);
      barWidth = clampedWidth;
    }

    let tooltipX = 0;

    if (isSimple) {
      tooltipX = zeroPosition + labelX + leftLabelOffset;

      if (isNegative || areAllNegative) {
        tooltipX = zeroPosition;
      }
    } else {
      tooltipX = zeroPosition + barWidth;

      if (isNegative) {
        tooltipX = zeroPosition;
      }
    }

    return {
      barWidth,
      isNegative,
      label,
      labelWidth,
      labelX,
      trendIndicatorProps,
      tooltipX,
    };
  }
}
