import {Fragment, useState} from 'react';
import {pie} from 'd3-shape';
import {
  clamp,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  useUniqueId,
  ChartState,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  DataPoint,
  DataSeries,
  Dimensions,
  LabelFormatter,
  Direction,
} from '@shopify/polaris-viz-core';

import {getContainerAlignmentForLegend} from '../../utilities';
import {estimateLegendItemWidth} from '../Legend';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {
  getSeriesColors,
  useColorVisionEvents,
  useWatchColorVisionEvents,
} from '../../hooks';
import {Arc} from '../Arc';
import type {
  LegendPosition,
  RenderInnerValueContent,
  RenderLegendContent,
} from '../../types';
import {ChartSkeleton} from '../../components/ChartSkeleton';

import styles from './DonutChart.scss';
import {InnerValue} from './components';

const ERROR_ANIMATION_PADDING = 40;
const FULL_CIRCLE = Math.PI * 2;
const MAX_LEGEND_WIDTH_PERCENTAGE = 0.35;
const RADIUS_PADDING = 20;

export interface ChartProps {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
  legendPosition: LegendPosition;
  showLegend: boolean;
  showLegendValues: boolean;
  state: ChartState;
  theme: string;
  accessibilityLabel?: string;
  comparisonMetric?: ComparisonMetricProps;
  dimensions?: Dimensions;
  errorText?: string;
  legendFullWidth?: boolean;
  renderInnerValueContent?: RenderInnerValueContent;
  renderLegendContent?: RenderLegendContent;
  total?: number;
}

export function Chart({
  data,
  labelFormatter,
  legendPosition = 'right',
  showLegend,
  showLegendValues,
  state,
  theme,
  accessibilityLabel = '',
  comparisonMetric,
  dimensions = {height: 0, width: 0},
  errorText,
  legendFullWidth = false,
  renderInnerValueContent,
  renderLegendContent,
  total,
}: ChartProps) {
  const {shouldAnimate, characterWidths} = useChartContext();
  const chartId = useUniqueId('Donut');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const selectedTheme = useTheme();

  const seriesCount = clamp({amount: data.length, min: 1, max: Infinity});
  const seriesColor = getSeriesColors(seriesCount, selectedTheme);

  const legendDirection: Direction =
    legendPosition === 'right' || legendPosition === 'left'
      ? 'vertical'
      : 'horizontal';

  const longestLegendWidth = data.reduce((previous, current) => {
    const text = showLegendValues
      ? `${current.name} ${current.data[0]?.value}` ?? ''
      : current.name ?? '';

    const estimatedLegendWidth = estimateLegendItemWidth(text, characterWidths);

    if (estimatedLegendWidth > previous) {
      return estimatedLegendWidth;
    }

    return previous;
  }, 0);

  const maxLegendWidth =
    legendDirection === 'vertical'
      ? Math.min(
          longestLegendWidth,
          dimensions.width * MAX_LEGEND_WIDTH_PERCENTAGE,
        )
      : 0;

  const {height, width, legend, setLegendDimensions, isLegendMounted} =
    useLegend({
      data: [{series: data, shape: 'Bar'}],
      dimensions,
      showLegend,
      showLegendValues,
      direction: legendDirection,
      colors: seriesColor,
      maxWidth: maxLegendWidth,
    });

  const shouldUseColorVisionEvents = Boolean(
    width && height && isLegendMounted,
  );

  useColorVisionEvents(shouldUseColorVisionEvents);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

  if (!width || !height) return null;
  const diameter = Math.min(height, width);
  const radius = diameter / 2;

  const points: DataPoint[] = data.reduce(
    (prev: DataPoint[], {data}) => prev.concat(data),
    [],
  );

  const createPie = pie<DataPoint>()
    .value(({value}) => value!)
    .sort(null);
  const pieChartData = createPie(points);
  const emptyState = pieChartData.length === 0;

  const totalValue =
    total || points.reduce((acc, {value}) => (value ?? 0) + acc, 0);

  const activeValue = points[activeIndex]?.value;

  const minX = -(40 + ERROR_ANIMATION_PADDING);
  const minY = -40;
  const viewBoxDimensions = {
    height: diameter + RADIUS_PADDING,
    width: diameter + RADIUS_PADDING - minX,
  };

  const containerAlignmentStyle =
    getContainerAlignmentForLegend(legendPosition);

  return (
    <div className={styles.DonutWrapper} style={containerAlignmentStyle}>
      <div className={styles.Donut}>
        {state === ChartState.Success ? (
          <Fragment>
            <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
            <svg
              viewBox={`${minX} ${minY} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
              height={diameter}
              width={diameter}
            >
              {isLegendMounted && (
                <g className={styles.DonutChart}>
                  {emptyState ? (
                    <g aria-hidden>
                      <Arc
                        isAnimated={shouldAnimate}
                        width={diameter}
                        height={diameter}
                        radius={radius}
                        startAngle={0}
                        endAngle={FULL_CIRCLE}
                        color={selectedTheme.grid.color}
                        cornerRadius={selectedTheme.arc.cornerRadius}
                        thickness={selectedTheme.arc.thickness}
                      />
                    </g>
                  ) : (
                    pieChartData.map(
                      ({data: pieData, startAngle, endAngle}, index) => {
                        const color = data[index]?.color ?? seriesColor[index];
                        const name = data[index].name;
                        const accessibilityLabel = `${name}: ${pieData.key} - ${pieData.value}`;

                        return (
                          <g
                            key={`${chartId}-arc-${index}`}
                            className={styles.DonutChart}
                            aria-label={accessibilityLabel}
                            role="img"
                          >
                            <Arc
                              isAnimated={shouldAnimate}
                              index={index}
                              activeIndex={activeIndex}
                              width={diameter}
                              height={diameter}
                              radius={radius}
                              startAngle={startAngle}
                              endAngle={endAngle}
                              color={color}
                              cornerRadius={selectedTheme.arc.cornerRadius}
                              thickness={selectedTheme.arc.thickness}
                            />
                          </g>
                        );
                      },
                    )
                  )}
                </g>
              )}
            </svg>
            <InnerValue
              activeValue={activeValue}
              isAnimated={shouldAnimate}
              totalValue={totalValue}
              comparisonMetric={comparisonMetric}
              labelFormatter={labelFormatter}
              renderInnerValueContent={renderInnerValueContent}
            />
          </Fragment>
        ) : (
          <ChartSkeleton
            dimensions={{width: diameter, height: diameter}}
            state={state}
            type="Donut"
            errorText={errorText}
            theme={theme}
          />
        )}
      </div>
      {showLegend && (
        <LegendContainer
          fullWidth={legendFullWidth}
          onDimensionChange={setLegendDimensions}
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          direction={legendDirection}
          position={legendPosition}
          maxWidth={maxLegendWidth}
          renderLegendContent={renderLegendContent}
        />
      )}
    </div>
  );
}
