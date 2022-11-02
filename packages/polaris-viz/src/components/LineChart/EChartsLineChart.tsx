import React from 'react';
import {
  WithRequired,
  DEFAULT_CHART_PROPS,
  getGradientFromColor,
  useTheme,
  useThemeSeriesColors,
  GradientStop,
} from '@shopify/polaris-viz-core';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {LineChart, LineSeriesOption} from 'echarts/charts';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {SVGRenderer} from 'echarts/renderers';

import {getLineChartDataWithDefaults} from '../../utilities/getLineChartDataWithDefaults';

import type {LineChartProps} from './LineChart';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
]);

echarts.registerTheme('PolarisVizLight', {
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: '0',
    symbol: 'emptyCircle',
    smooth: true,
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgb(238,238,239)',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: 'transparent',
      },
    },
    axisLabel: {
      show: true,
      color: '#70707b',
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: 'transparent',
      },
    },
    axisLabel: {
      show: true,
      color: '#70707b',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['rgb(238,238,239)'],
      },
    },
    splitArea: {
      show: false,
    },
  },
  legend: {
    textStyle: {
      color: '#333333',
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cbcbcf',
        width: 1,
      },
      crossStyle: {
        color: '#cbcbcf',
        width: 1,
      },
    },
  },
});

type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

export function EChartsLineChart(props: LineChartProps) {
  const {
    // annotations = [],
    data,
    // state,
    // errorText,
    tooltipOptions,
    // showLegend = true,
    // skipLinkText,
    // emptyStateText,
    // isAnimated,
    xAxisOptions,
    yAxisOptions,
    theme,
  }: WithRequired<LineChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const dataWithDefaults = getLineChartDataWithDefaults(data, seriesColors);

  const xAxisData = dataWithDefaults.map((serie) =>
    serie.data.map((datum) => xAxisOptions?.labelFormatter!(datum.key) ?? ''),
  )[0];

  const option: ECOption = {
    animationDuration: 400,
    legend: {
      show: true,
      selectorPosition: 'start',
      bottom: 0,
      right: 0,
      icon: 'rect',
      lineStyle: {
        color: 'transparent',
      },
      itemHeight: 2,
      itemWidth: 12.5,
    },
    grid: {
      show: false,
      top: 10,
      left: 10,
      right: 50,
      bottom: 45,
      containLabel: true,
    },
    tooltip: {
      confine: true,
      trigger: 'axis',
      show: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: selectedTheme.crossHair.color,
        },
      },
      valueFormatter(value) {
        return tooltipOptions?.valueFormatter!(value as string) ?? '';
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: xAxisData,
      silent: true,
      axisLabel: {
        margin: 15,
        showMinLabel: true,
        showMaxLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      silent: true,
      axisLabel: {
        formatter(value) {
          return yAxisOptions?.labelFormatter!(value) ?? '';
        },
      },
    },
    series: dataWithDefaults.map((serie) => {
      const color: LineSeriesOption['color'] = serie.isComparison
        ? selectedTheme.seriesColors.comparison
        : {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: getGradientFromColor(serie.color).map(
              ({offset, color}) => ({
                offset: offset / 100,
                color,
              }),
            ),
          };
      const areaStyle: LineSeriesOption['areaStyle'] = serie.isComparison
        ? undefined
        : {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 0.65,
              colorStops: [
                ...(serie.color as GradientStop[]).map(({offset, color}) => ({
                  offset: (offset / 100) * 0.15,
                  color,
                })),
                {
                  offset: 1,
                  color: 'rgba(1, 1, 1, 0)',
                },
              ],
            },
            opacity: 0.1,
          };
      return {
        cursor: 'default',
        name: serie.name,
        color,
        areaStyle,
        // eslint-disable-next-line id-length
        z: serie.isComparison ? 1 : 2,
        lineStyle: {
          type: serie.isComparison ? [2, 2] : 'solid',
        },
        data: serie.data.map((datum) => datum.value ?? '-'),
        type: 'line',
        emphasis: {
          focus: 'series',
        },
      };
    }),
  };

  // eslint-disable-next-line no-console
  console.log({option});

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={{height: '100%', width: '100%'}}
      notMerge
      lazyUpdate
      opts={{renderer: 'svg', locale: 'EN'}}
      theme="PolarisVizLight"
    />
  );
}
