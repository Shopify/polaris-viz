import type {ReactNode} from 'react';
import {Fragment, useState} from 'react';
import {pie} from 'd3-shape';
import {
  clamp,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  useUniqueId,
  ChartState,
  useChartContext,
  THIN_ARC_CORNER_THICKNESS,
  isInfinity,
  DataType,
  ChartMargin,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import type {
  DataPoint,
  DataSeries,
  LabelFormatter,
  Direction,
  BoundingRect,
} from '@shopify/polaris-viz-core';

import {getAnimationDelayForItems} from '../../utilities/getAnimationDelayForItems';
import {getContainerAlignmentForLegend} from '../../utilities';
import {useDonutChartTooltipContents} from '../../hooks/useDonutChartTooltipContents';
import {TooltipWrapper} from '../../components/TooltipWrapper';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {
  getSeriesColors,
  useColorVisionEvents,
  useWatchColorVisionEvents,
} from '../../hooks';
import {Arc} from '../Arc';
import type {
  ColorVisionInteractionMethods,
  LegendPosition,
  RenderHiddenLegendLabel,
  RenderInnerValueContent,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {ChartSkeleton} from '../../components/ChartSkeleton';

import styles from './DonutChart.scss';
import {InnerValue, LegendValues} from './components';

const FULL_CIRCLE = Math.PI * 2;
const RADIUS_PADDING = 20;
const SMALL_CHART_HEIGHT_THRESHOLD = 150;

export interface BaseChartProps {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
  legendPosition: LegendPosition;
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  state: ChartState;
  theme: string;
  accessibilityLabel?: string;
  comparisonMetric?: ComparisonMetricProps;
  errorText?: string;
  legendFullWidth?: boolean;
  renderInnerValueContent?: RenderInnerValueContent;
  renderLegendContent?: RenderLegendContent;
  renderTooltipContent?: (data: RenderTooltipContentData) => ReactNode;
  total?: number;
}

interface ChartPropsWithLegendValues extends BaseChartProps {
  showLegendValues: true;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
}

interface ChartPropsWithoutLegendValues extends BaseChartProps {
  showLegendValues?: false;
  renderHiddenLegendLabel?: never;
}

export type ChartProps =
  | ChartPropsWithLegendValues
  | ChartPropsWithoutLegendValues;

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
  errorText,
  legendFullWidth = false,
  renderInnerValueContent,
  renderLegendContent,
  renderHiddenLegendLabel,
  seriesNameFormatter,
  renderTooltipContent,
  total,
}: ChartProps) {
  const {shouldAnimate, containerBounds} = useChartContext();
  const chartId = useUniqueId('Donut');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const selectedTheme = useTheme();
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const seriesCount = clamp({
    amount: data.length,
    min: 1,
  });

  const seriesColor = getSeriesColors(seriesCount, selectedTheme);

  const chartBounds: BoundingRect = {
    width: containerBounds.width,
    height: containerBounds.height,
    x: 0,
    y: 0,
  };

  const getTooltipMarkup = useDonutChartTooltipContents({
    renderTooltipContent,
    data,
    seriesColors: seriesColor,
  });

  const legendDirection: Direction =
    legendPosition === 'right' || legendPosition === 'left'
      ? 'vertical'
      : 'horizontal';

  const maxLegendWidth =
    legendDirection === 'vertical' ? containerBounds.width / 2 : 0;

  const {height, width, legend, setLegendDimensions} = useLegend({
    data: [{series: data, shape: 'Bar'}],
    showLegend,
    direction: legendDirection,
    colors: seriesColor,
    maxWidth: maxLegendWidth,
    seriesNameFormatter,
  });

  const shouldUseColorVisionEvents = Boolean(width && height);

  useColorVisionEvents({
    enabled: shouldUseColorVisionEvents,
  });

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

  if (!width || !height) {
    return null;
  }

  const diameter = Math.min(height, width);
  const radius = diameter / 2;
  const dynamicThickness = height / 10;
  const maxThickness = selectedTheme.arc.thickness;
  const thickness =
    height > SMALL_CHART_HEIGHT_THRESHOLD
      ? Math.min(dynamicThickness, maxThickness)
      : THIN_ARC_CORNER_THICKNESS;

  const points: DataPoint[] = data.reduce(
    (prev: DataPoint[], {data}) => prev.concat(data),
    [],
  );

  const createPie = pie<DataPoint>()
    .value(({value}) => value!)
    .sort(null)
    .padAngle(0.05);
  const pieChartData = createPie(points);
  const isEveryValueZero = points.every(({value}) => value === 0);
  const emptyState = pieChartData.length === 0 || isEveryValueZero;

  const dataSum = points.reduce((acc, {value}) => (value ?? 0) + acc, 0);

  if (isInfinity(dataSum)) {
    throw new Error('Data must be finite');
  }

  const totalValue = total || dataSum;

  const activeValue = points[activeIndex]?.value;

  const minX = -40;
  const minY = -40;
  const viewBoxDimensions = {
    height: diameter + RADIUS_PADDING,
    width: diameter + RADIUS_PADDING,
  };

  const containerAlignmentStyle =
    getContainerAlignmentForLegend(legendPosition);

  const dynamicStyles = {
    ...containerAlignmentStyle,
    gap: legendDirection === 'vertical' ? '16px' : undefined,
  };

  const renderLegendContentWithValues = ({
    getColorVisionStyles,
    getColorVisionEventAttrs,
  }: ColorVisionInteractionMethods) => {
    return (
      <LegendValues
        data={data}
        activeIndex={activeIndex}
        legendFullWidth={legendFullWidth}
        labelFormatter={labelFormatter}
        getColorVisionStyles={getColorVisionStyles}
        getColorVisionEventAttrs={getColorVisionEventAttrs}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
        seriesNameFormatter={seriesNameFormatter}
      />
    );
  };

  const shouldRenderLegendContentWithValues =
    !renderLegendContent && showLegendValues && legendDirection === 'vertical';

  const isCornerPosition = legendPosition.includes('-');

  return (
    <div className={styles.DonutWrapper} style={dynamicStyles}>
      <div className={styles.Donut}>
        {state === ChartState.Success ? (
          <Fragment>
            <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
            <svg
              viewBox={`${minX} ${minY} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
              height={diameter}
              width={diameter}
              ref={setSvgRef}
            >
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
                      thickness={thickness}
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
                            animationDelay={getAnimationDelayForItems(
                              pieChartData.length,
                            )}
                            index={index}
                            activeIndex={activeIndex}
                            width={diameter}
                            height={diameter}
                            radius={radius}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            color={color}
                            cornerRadius={selectedTheme.arc.cornerRadius}
                            thickness={thickness}
                          />
                        </g>
                      );
                    },
                  )
                )}
              </g>
            </svg>
            <InnerValue
              activeValue={activeValue}
              activeIndex={activeIndex}
              isAnimated={shouldAnimate}
              totalValue={totalValue}
              comparisonMetric={comparisonMetric}
              labelFormatter={labelFormatter}
              renderInnerValueContent={renderInnerValueContent}
              diameter={diameter}
            />
          </Fragment>
        ) : (
          <ChartSkeleton
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
          enableHideOverflow={!isCornerPosition}
          renderLegendContent={
            shouldRenderLegendContentWithValues
              ? renderLegendContentWithValues
              : renderLegendContent
          }
        />
      )}
      <TooltipWrapper
        chartBounds={chartBounds}
        chartType={InternalChartType.Donut}
        focusElementDataType={DataType.Arc}
        forceActiveIndex={activeIndex}
        getMarkup={getTooltipMarkup}
        margin={ChartMargin}
        parentElement={svgRef}
        usePortal
      />
    </div>
  );
}
