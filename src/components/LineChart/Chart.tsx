import React, {useState} from 'react';
import {line, curveCatmullRom} from 'd3-shape';

import {LinearXAxis} from '../LinearXAxis';
import {YAxis} from '../YAxis';
import {eventPoint} from '../../utilities';
import {Crosshair} from '../Crosshair';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {Series} from './types';
import {Margin, SPACING_TIGHT} from './constants';
import {useXScale, useYScale} from './hooks';
import {Line, Tooltip} from './components';
import styles from './Chart.scss';
import {TooltipContainer} from 'components';

interface Props {
  series: Series[];
  xAxisLabels?: string[];
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  dimensions: DOMRect;
}

export function Chart({
  series,
  dimensions,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
}: Props) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const marginBottom = xAxisLabels == null ? SPACING_TIGHT : Margin.Bottom;
  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const formattedLabels =
    xAxisLabels == null ? null : xAxisLabels.map(formatXAxisLabel);

  const {axisMargin, ticks, yScale} = useYScale({
    drawableHeight,
    series,
    formatYAxisLabel,
  });

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;
  const longestSeriesLength = series.reduce<number>(
    (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
    0,
  );

  const {xScale} = useXScale({drawableWidth, longestSeriesLength});

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  // function getIndexFromString(label: string, series: Series) {
  //   return series.data.findIndex(
  //     (singleSeries) => singleSeries.label === label,
  //   );
  // }

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    if (axisMargin == null || xScale == null) {
      return;
    }

    const point = eventPoint(event);
    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    if (svgX < axisMargin) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - axisMargin));
    setActivePointIndex(Math.min(longestSeriesLength, closestIndex));
    setTooltipPosition({
      x: svgX,
      y: svgY,
    });
  }

  return (
    <div className={styles.Container}>
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onTouchEnd={() => setActivePointIndex(null)}
        onMouseLeave={() => setActivePointIndex(null)}
      >
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8f8f8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fc00ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#f8f8f8" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05a" />
            <stop offset="100%" stopColor="#0a5" />
          </linearGradient>
        </defs>

        <g
          transform={`translate(${axisMargin},${dimensions.height -
            marginBottom})`}
        >
          <LinearXAxis
            xScale={xScale}
            labels={formattedLabels}
            dimensions={dimensions}
            drawableHeight={drawableHeight}
            axisMargin={axisMargin}
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        {/* {activePointIndex == null ? null : (
          <g transform={`translate(${axisMargin},${Margin.Top})`}>
            <Crosshair x={xScale(activePointIndex)} height={drawableHeight} />
          </g>
        )} */}

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {series
            .slice()
            .reverse()
            .map((singleSeries) => {
              const {data, name} = singleSeries;

              const predictionIndexStart =
                data.findIndex((x) => x.prediction === true) - 1;
              const nonPredictionData = data.filter((x) => !x.prediction);
              const predictionData = [
                nonPredictionData[nonPredictionData.length - 1],
                ...data.filter((x) => x.prediction),
              ];

              const pastLineGenerator = line<{
                rawValue: number;
                label: string;
              }>()
                .x((_, index) => xScale(index))
                .y(({rawValue}) => yScale(rawValue))
                .curve(curveCatmullRom.alpha(0.5));

              const pastLine = pastLineGenerator(nonPredictionData);

              const futureLineGenerator = line<{
                rawValue: number;
                label: string;
              }>()
                .x((_, index) => xScale(index + predictionIndexStart))
                .y(({rawValue}) => yScale(rawValue))
                .curve(curveCatmullRom.alpha(0.5));

              const futureLine = futureLineGenerator(predictionData);

              if (pastLine == null) {
                throw new Error(
                  `Could not generate line path for series ${name}`,
                );
              }

              return (
                <>
                  <Line
                    key={`${name}future`}
                    xScale={xScale}
                    yScale={yScale}
                    series={singleSeries}
                    path={pastLine}
                    activePointIndex={activePointIndex}
                    setActiveAnnotation={setActiveAnnotation}
                    activeAnnotation={activeAnnotation}
                  />

                  {predictionData.length === 0 || futureLine == null ? null : (
                    <Line
                      key={`${name}past`}
                      xScale={xScale}
                      yScale={yScale}
                      series={singleSeries}
                      path={futureLine}
                      activePointIndex={activePointIndex}
                      setActiveAnnotation={setActiveAnnotation}
                      activeAnnotation={activeAnnotation}
                      prediction
                    />
                  )}
                </>
              );
            })}
        </g>
      </svg>

      {tooltipPosition == null ||
      activePointIndex == null ||
      activeAnnotation ? null : (
        <Tooltip
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          formatYAxisLabel={formatYAxisLabel}
          series={series}
          chartDimensions={dimensions}
        />
      )}

      {tooltipPosition != null &&
      activePointIndex != null &&
      activeAnnotation ? (
        <TooltipContainer
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={dimensions}
          margin={{Top: 0, Left: 0, Bottom: 0, Right: 0}}
        >
          <div>
            <p style={{fontSize: 12, fontWeight: 'bold'}}>
              ⓘ Anomaly detection
            </p>
            <ul style={{fontSize: 12, paddingLeft: 30}}>
              <li>Sales: $514K (↑ 90%)</li>
              <li>Notable events: Black Friday</li>
              <li>Active marketing campaign: BFCM</li>
            </ul>
          </div>
        </TooltipContainer>
      ) : null}
    </div>
  );
}
