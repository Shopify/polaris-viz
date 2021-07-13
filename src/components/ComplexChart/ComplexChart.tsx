import React, {useMemo, useState} from 'react';
import {line} from 'd3-shape';

import {
  useYScale as useBarChartYScale,
  useXScale as useBarChartXScale,
} from '../../components/BarChart/hooks';
import {curveStepRounded, getBarXAxisDetails} from '../../utilities';
import {useYScale as useLineChartYScale} from '../../components/LineChart/hooks';
import {useLinearXScale} from '../../hooks';
import {Line} from '../LineChart/components';
import {Bar, YAxis, TooltipContainer, BarChartXAxis} from '../../components';

// NOTES
// needs to handle both linear and bar scale if both components are used

// QS
// how should tooltips work?
// accessibility
// how do we determine what to show on the axis
// -- would we be showing things that have different datasets/min/max?
// would we want duual yAxis?

// API: does it make sense to have a generic complex chart,
// would composable be better or just direct options or the combinations we want

export function ComplexChart() {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const bottomAxis = 100;
  const drawableHeight = 500 - bottomAxis; // bottom axis allowance
  const drawableWidth = 800;

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
    {rawValue: 1324.19, label: '2020-04-01T12:00:00Z'},
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

  const {yScale, ticks, axisMargin} = useLineChartYScale({
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
    drawableHeight,
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

  const yAxisWidth = 30;

  const barXAxisDetails = getBarXAxisDetails({
    xLabels: xAxisLabels.map((x) => x.value),
    yAxisLabelWidth: yAxisWidth,
    fontSize: 10,
    width: drawableWidth,
    innerMargin: 0.1,
    outerMargin: 0,
  });

  return (
    <svg
      width={drawableWidth + yAxisWidth}
      height={drawableHeight + bottomAxis}
    >
      <g transform={`translate(0,${5})`} aria-hidden="true">
        <YAxis
          ticks={barChartTicks}
          fontSize={10}
          width={yAxisWidth}
          textAlign="left"
          labelColor="#d3d3d3"
        />
      </g>

      <g
        transform={`translate(${yAxisWidth},${drawableHeight})`}
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

      <g transform={`translate(${yAxisWidth}, 0)`}>
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
              height={barChartYScale(rawValue)}
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
  );
}
