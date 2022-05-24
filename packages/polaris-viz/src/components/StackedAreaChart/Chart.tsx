import React, {useState, useMemo, useRef} from 'react';
import {line} from 'd3-shape';
import type {
  DataSeries,
  DataPoint,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  curveStepRounded,
  DataType,
  Dimensions,
} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData} from '../../types';
import {getAlteredLineChartPosition} from '../../utilities/getAlteredLineChartPosition';
import {LinearXAxisLabels} from '../LinearXAxisLabels';
import {LegendContainer, useLegend} from '../LegendContainer';
import {
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
import {
  useLinearChartAnimations,
  usePrefersReducedMotion,
  useTheme,
  useThemeSeriesColors,
  useColorVisionEvents,
  useLinearLabelsAndDimensions,
} from '../../hooks';
import {
  LineChartMargin as Margin,
  XMLNS,
  COLOR_VISION_SINGLE_ITEM,
  LABEL_AREA_TOP_SPACING,
} from '../../constants';
import {eventPointNative} from '../../utilities';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {useYScale, useStackedData} from './hooks';
import {StackedAreas, Points} from './components';
import styles from './Chart.scss';
import {useStackedChartTooltipContent} from './hooks/useStackedChartTooltipContent';

export interface Props {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  isAnimated: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  xAxisOptions,
  data,
  dimensions,
  renderTooltipContent,
  isAnimated,
  showLegend,
  theme,
  yAxisOptions,
}: Props) {
  useColorVisionEvents(data.length > 1);

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [labelHeight, setLabelHeight] = useState(0);

  const {legend, setLegendHeight, height, width} = useLegend({
    colors: seriesColors,
    data,
    dimensions,
    showLegend,
    shape: 'Line',
  });

  const tooltipId = useRef(uniqueId('stackedAreaChart'));

  const hideXAxis = xAxisOptions.hide || selectedTheme.xAxis.hide;

  const {stackedValues, longestSeriesLength, labels} = useStackedData({
    data,
    xAxisOptions,
  });

  const drawableHeight =
    height - labelHeight - LABEL_AREA_TOP_SPACING - Margin.Top;

  const {yAxisLabelWidth, ticks, yScale} = useYScale({
    drawableHeight,
    stackedValues,
    formatYAxisLabel: yAxisOptions.labelFormatter,
  });

  const {chartStartPosition, drawableWidth, xAxisDetails, xScale} =
    useLinearLabelsAndDimensions({
      data,
      longestSeriesLength,
      theme,
      width,
      labels,
      xAxisOptions,
      yAxisLabelWidth,
    });

  const getTooltipMarkup = useStackedChartTooltipContent({
    data,
    renderTooltipContent,
    seriesColors,
  });

  const lineGenerator = useMemo(() => {
    const generator = line<DataPoint>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({value}) => yScale(value ?? 0));

    if (selectedTheme.line.hasSpline) {
      generator.curve(curveStepRounded);
    }

    return generator;
  }, [xScale, yScale, selectedTheme.line.hasSpline]);

  const seriesForAnimation: DataSeries[] = useMemo(() => {
    return stackedValues.map((value) => {
      return {
        name: '',
        data: value.map((val) => {
          return {
            key: '',
            value: val[1],
          };
        }),
      };
    });
  }, [stackedValues]);

  const {animatedCoordinates} = useLinearChartAnimations({
    data: seriesForAnimation,
    lineGenerator,
    activeIndex: activePointIndex,
    isAnimated: true,
  });

  const getXPosition = (
    {isCrosshair, index} = {isCrosshair: false, index: activePointIndex},
  ) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    if (
      index !== null &&
      animatedCoordinates != null &&
      activePointIndex != null &&
      animatedCoordinates[index]
    ) {
      return animatedCoordinates[index].to((coord) => coord.x - offset);
    }

    return xScale(index == null ? 0 : index) - offset;
  };

  if (xScale == null || drawableWidth == null || yAxisLabelWidth == null) {
    return null;
  }

  return (
    <div className={styles.Container} style={{height, width}}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.Chart}
        xmlns={XMLNS}
        width={width}
        height={height}
        ref={setSvgRef}
        role="table"
        style={{height, width}}
      >
        {hideXAxis ? null : (
          <LinearXAxisLabels
            chartHeight={height}
            chartX={chartStartPosition - xAxisDetails.labelWidth / 2}
            chartY={
              drawableHeight + LABEL_AREA_TOP_SPACING + (Margin.Top as number)
            }
            labels={labels}
            labelWidth={xAxisDetails.labelWidth}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={xAxisDetails.reducedLabelIndexes}
            theme={theme}
            xScale={xScale}
          />
        )}

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            theme={theme}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartStartPosition,
              y: Margin.Top,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            width={yAxisLabelWidth}
            textAlign="right"
            theme={theme}
          />
        </g>

        <VisuallyHiddenRows
          data={data}
          formatYAxisLabel={yAxisOptions.labelFormatter}
          xAxisLabels={labels}
        />

        <g
          transform={`translate(${chartStartPosition},${Margin.Top})`}
          className={styles.Group}
          area-hidden="true"
        >
          <StackedAreas
            stackedValues={stackedValues}
            xScale={xScale}
            yScale={yScale}
            colors={seriesColors}
            isAnimated={isAnimated && !prefersReducedMotion}
            theme={theme}
          />
        </g>

        {activePointIndex == null ? null : (
          <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
            <Crosshair
              x={getXPosition({isCrosshair: true, index: 0})}
              height={drawableHeight}
              theme={theme}
            />
          </g>
        )}

        <Points
          activePointIndex={activePointIndex}
          animatedCoordinates={animatedCoordinates}
          colors={seriesColors}
          chartStartPosition={chartStartPosition}
          getXPosition={getXPosition}
          isAnimated={isAnimated}
          stackedValues={stackedValues}
          theme={theme}
          tooltipId={tooltipId.current}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
      <TooltipWrapper
        chartDimensions={{width, height}}
        getAlteredPosition={getAlteredLineChartPosition}
        focusElementDataType={DataType.Point}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        id={tooltipId.current}
        margin={Margin}
        onIndexChange={(index) => setActivePointIndex(index)}
        parentRef={svgRef}
      />
      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onHeightChange={setLegendHeight}
          theme={theme}
        />
      )}
    </div>
  );

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    let activeIndex = -1;

    if (eventType === 'mouse' && event) {
      const point = eventPointNative(event!);

      if (point == null || xScale == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgX} = point;

      const closestIndex = Math.round(xScale.invert(svgX - chartStartPosition));
      activeIndex = Math.min(longestSeriesLength, closestIndex);
    } else if (index != null) {
      activeIndex = index;
    }

    if (activeIndex !== -1) {
      return {
        x: chartStartPosition + (xScale(activeIndex) ?? 0),
        y: 0,
        activeIndex,
      };
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}
