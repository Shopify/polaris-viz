import React, {useMemo} from 'react';
import {
  useYScale as useBarChartYScale,
  useXScale as useBarChartXScale,
  useYScale,
} from 'components/BarChart/hooks';
import {line} from 'd3-shape';

import {curveStepRounded} from '../../utilities';
import {useYScale as useLineChartYScale} from '../../components/LineChart/hooks';
import {useLinearXScale} from '../../hooks';
import {Line} from '../LineChart/components';
import {LinearXAxis, Bar, YAxis, TooltipContainer} from '../../components';

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
  const drawableHeight = 500;
  const drawableWidth = 500;

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

  // improve
  const longestSeriesLength = series[0].data.length;

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

    if (true) {
      generator.curve(curveStepRounded);
    }
    return generator;
  }, [linearXScale, yScale]);

  return (
    <svg width={drawableWidth} height={drawableHeight}>
      <Line
        lineGenerator={lineGenerator}
        series={series[0]}
        isAnimated
        index={0}
        color="darkGrey"
        lineOptions={{width: 1, hasSpline: true}}
      />
    </svg>
  );
}
