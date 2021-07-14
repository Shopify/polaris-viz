import React, {useMemo, useState} from 'react';
import {line} from 'd3-shape';

import {
  useYScale as useBarChartYScale,
  useXScale as useBarChartXScale,
} from '../../components/BarChart/hooks';
import {
  clamp,
  curveStepRounded,
  eventPoint,
  getBarXAxisDetails,
} from '../../utilities';
import {useYScale as useLineChartYScale} from '../../components/LineChart/hooks';
import {useLinearXScale} from '../../hooks';
import {Line} from '../LineChart/components';
import {Bar, YAxis, TooltipContainer, BarChartXAxis} from '../../components';

// to do
// add points
// fix hacks
// work on API
// fix tooltip bug
// polish
// accessibility

export function ComplexChart() {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const Margin = {Top: 30, Left: 0, Bottom: 50, Right: 0};

  const width = 800;
  const height = 500;
  const yAxisWidth = 30;
  const xAxisHeight = 20;

  const drawableHeight = height - Margin.Bottom - Margin.Top;
  const drawableWidth = 800 - Margin.Left - Margin.Right - yAxisWidth;

  const series = [
    {
      name: 'Apr 01–Apr 14, 2020',
      data: [
        {rawValue: 333, label: '2020-04-01T12:00:00'},
        {rawValue: 797, label: '2020-04-02T12:00:00'},
        {rawValue: 234, label: '2020-04-03T12:00:00'},
        {rawValue: 534, label: '2020-04-04T12:00:00'},
        {rawValue: -132, label: '2020-04-05T12:00:00'},
        {rawValue: 159, label: '2020-04-06T12:00:00'},
        {rawValue: 239, label: '2020-04-07T12:00:00'},
        {rawValue: 708, label: '2020-04-08T12:00:00'},
        {rawValue: 234, label: '2020-04-09T12:00:00'},
        {rawValue: 645, label: '2020-04-10T12:00:00'},
        {rawValue: 543, label: '2020-04-11T12:00:00'},
        {rawValue: 89, label: '2020-04-12T12:00:00'},
        {rawValue: 849, label: '2020-04-13T12:00:00'},
        {rawValue: 129, label: '2020-04-14T12:00:00'},
      ],
      color: 'darkGrey',
      lineStyle: 'solid' as 'solid',
      lineOptions: {
        hasSpline: true,
      },
    },
  ];

  const barChartData = [
    {rawValue: 1124.19, label: '2020-04-01T12:00:00Z'},
    {rawValue: 1022.79, label: '2020-04-02T12:00:00Z'},
    {rawValue: 713.29, label: '2020-04-03T12:00:00Z'},
    {rawValue: 413.29, label: '2020-04-04T12:00:00Z'},
    {rawValue: 100.79, label: '2020-04-05T12:00:00Z'},
    {rawValue: 350.6, label: '2020-04-06T12:00:00Z'},
    {rawValue: 277.69, label: '2020-04-07T12:00:00Z'},
    {rawValue: 10, label: '2020-04-08T12:00:00Z'},
  ];

  // need to account for possubility of more series?
  const longestSeriesLength = series[0].data.length - 1;

  const {yScale} = useLineChartYScale({
    fontSize: 10,
    drawableHeight,
    formatYAxisLabel: (label) => label.toString(),
    series,
    integersOnly: false,
  });

  const {xScale: linearXScale} = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  const lineGenerator = useMemo(() => {
    const generator = line<{rawValue: number}>()
      .x((_, index) => (linearXScale == null ? 0 : linearXScale(index)))
      .y(({rawValue}) => yScale(rawValue));

    generator.curve(curveStepRounded);

    return generator;
  }, [linearXScale, yScale]);

  const {yScale: barChartYScale, ticks: barChartTicks} = useBarChartYScale({
    drawableHeight: drawableHeight - xAxisHeight,
    data: barChartData,
    integersOnly: false,
    formatYAxisLabel: (label) => label.toString(),
  });

  const {xScale: barChartXScale, xAxisLabels} = useBarChartXScale({
    drawableWidth,
    innerMargin: 0.1,
    outerMargin: 0,
    data: barChartData,
    formatXAxisLabel: (label) => label,
  });

  const barXAxisDetails = getBarXAxisDetails({
    xLabels: xAxisLabels.map((x) => x.value),
    yAxisLabelWidth: yAxisWidth,
    fontSize: 10,
    width: drawableWidth,
    innerMargin: 0.1,
    outerMargin: 0,
  });

  return (
    <div>
      <svg
        width={width}
        height={height}
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onMouseLeave={() => setActiveBar(null)}
        onTouchEnd={() => setActiveBar(null)}
      >
        <g
          transform={`translate(${Margin.Left},${Margin.Top + xAxisHeight})`}
          aria-hidden="true"
        >
          <YAxis
            ticks={barChartTicks}
            fontSize={10}
            width={yAxisWidth}
            textAlign="left"
            labelColor="#d3d3d3"
          />
        </g>

        <g
          transform={`translate(${yAxisWidth},${
            height - Margin.Bottom - barXAxisDetails.maxXLabelHeight
          })`}
          aria-hidden="true"
        >
          <BarChartXAxis
            xScale={barChartXScale}
            labels={xAxisLabels}
            fontSize={10}
            xAxisDetails={barXAxisDetails}
            textColor="#D3D3D3"
            gridColor="black"
            showTicks={false}
          />
        </g>

        <g transform={`translate(${yAxisWidth}, ${Margin.Top + xAxisHeight})`}>
          {barChartData.map(({rawValue, label}, index) => {
            return (
              <Bar
                color="rgba(132, 86, 225, 0.9)"
                x={barChartXScale(index.toString())}
                key={label}
                yScale={barChartYScale}
                width={barChartXScale.bandwidth()}
                rawValue={rawValue}
                onFocus={() => null}
                index={index}
                tabIndex={0}
                rotateZeroBars={false}
                height={Math.abs(yScale(rawValue) - yScale(0))}
                hasRoundedCorners
              />
            );
          })}

          <Line
            lineGenerator={lineGenerator}
            series={series[0]}
            isAnimated
            index={0}
            color="#00A19F"
            lineOptions={{width: 2.5, hasSpline: true}}
          />
        </g>
      </svg>

      {tooltipPosition != null && activeBar != null && activePoint != null ? (
        <TooltipContainer
          activePointIndex={activeBar}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={{width: 800, height: 500}}
          margin={Margin}
          position="center"
        >
          <div
            style={{
              background: 'white',
              minWidth: '100px',
              minHeight: '50px',
              textAlign: 'center',
              padding: '4px',
              borderRadius: '4px',
              fontSize: 10,
            }}
          >
            <p>{`${barChartData[activeBar].label}: ${barChartData[activeBar].rawValue}`}</p>
            <br />
            <br />
            <p>
              {series[0].data[activePoint].label}:
              {series[0].data[activePoint].rawValue}
            </p>
          </div>
        </TooltipContainer>
      ) : null}
    </div>
  );

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    const point = eventPoint(event);

    if (point == null || linearXScale == null) {
      return;
    }

    const {svgX, svgY} = point;
    const currentPoint = svgX;
    const currentIndex = Math.floor(currentPoint / barChartXScale.step());
    const dataStartPosition = yAxisWidth;

    const closestIndex = Math.round(
      linearXScale.invert(svgX - dataStartPosition),
    );
    const clampedClosestIndex = clamp({
      amount: closestIndex,
      min: 0,
      max: series[0].data.length - 1,
    });

    console.log(clampedClosestIndex);
    setActivePoint(clampedClosestIndex);

    if (
      currentIndex < 0 ||
      currentIndex > barChartData.length - 1 ||
      svgY > drawableHeight + barXAxisDetails.maxXLabelHeight
    ) {
      setActiveBar(null);
      return;
    }

    const xPosition = barChartXScale(currentIndex.toString());
    const value = barChartData[currentIndex].rawValue;
    const tooltipXPositon =
      xPosition == null ? 0 : xPosition + barChartXScale.bandwidth() / 2;

    setActiveBar(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(value),
    });
  }
}
