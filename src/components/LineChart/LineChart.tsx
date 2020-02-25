import React, {createRef, useEffect, useState} from 'react';
import {scaleLinear, ScaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {axisBottom, axisLeft} from 'd3-axis';
import {select, customEvent, mouse} from 'd3-selection';

// becomes props/dynamic
const width = 700;
const height = 400;
const axisWidthAndHeight = 30;
const data = [
  {x: 0, y: 20},
  {x: 1, y: 30},
  {x: 2, y: 40},
  {x: 3, y: 40},
  {x: 4, y: 30},
  {x: 5, y: 10},
  {x: 6, y: -100},
];

const data2 = [
  {x: 0, y: 25},
  {x: 1, y: 10},
  {x: 2, y: 30},
  {x: 3, y: 50},
  {x: 4, y: 10},
  {x: 5, y: 0},
  {x: 6, y: -10},
];

const data3 = [
  {x: 0, y: 100},
  {x: 1, y: 100},
  {x: 2, y: -10},
  {x: 3, y: 100},
  {x: 4, y: 80},
  {x: 5, y: 100},
  {x: 6, y: 20},
];

const allData = [data, data2, data3];
const colors = ['red', 'purple', 'orange'];

//end fake data

function XAxis({xScale}: {xScale: ScaleLinear<number, number>}) {
  const xAxisRef = createRef<SVGGElement>();

  useEffect(() => {
    if (xAxisRef == null) {
      return;
    }

    const xAxisGenerator = axisBottom(xScale);

    select(xAxisRef.current)
      .call(xAxisGenerator)
      .attr('transform', `translate(0,${height - axisWidthAndHeight})`);
  });

  return <g ref={xAxisRef} />;
}
function YAxis({yScale}: {yScale: ScaleLinear<number, number>}) {
  const yAxisRef = createRef<SVGGElement>();

  useEffect(() => {
    if (yAxisRef == null) {
      return;
    }

    const yAxisGenerator = axisLeft(yScale);

    select(yAxisRef.current)
      .call(yAxisGenerator)
      .attr('transform', `translate(${axisWidthAndHeight},0)`);
  });

  return <g ref={yAxisRef} />;
}

function Line({
  data,
  xScale,
  yScale,
  stroke,
}: {
  data: {x: number; y: number}[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  stroke: string;
}) {
  const lineShape = line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  return (
    <path d={lineShape(data)} fill="none" stroke={stroke} strokeWidth="2" />
  );
}

export function LineChart() {
  const [closestXPosition, setClosestXPosition] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const svgContainer = createRef<SVGSVGElement>();

  const greatestXValues = allData.map((arr) =>
    arr.reduce((max, p) => (p.x > max ? p.x : max), 0),
  );
  const lowestXValues = allData.map((arr) =>
    arr.reduce((min, p) => (p.x < min ? p.x : min), 0),
  );
  const greatestYValues = allData.map((arr) =>
    arr.reduce((max, p) => (p.y > max ? p.y : max), 0),
  );
  const lowestYValues = allData.map((arr) =>
    arr.reduce((min, p) => (p.y < min ? p.y : min), 0),
  );

  const xScale = scaleLinear()
    .range([axisWidthAndHeight, width - axisWidthAndHeight])
    .domain([Math.min(...lowestXValues), Math.max(...greatestXValues)]);

  const yScale = scaleLinear()
    .range([height - axisWidthAndHeight, axisWidthAndHeight])
    .domain([Math.min(...lowestYValues), Math.max(...greatestYValues)]);

  const currentValues = allData.map((dataSet) =>
    dataSet.filter((data) => data.x === closestXPosition),
  );

  return (
    <>
      <svg
        ref={svgContainer}
        width={width}
        height={height}
        onMouseLeave={() => {
          setClosestXPosition(null);
        }}
        onMouseMove={(event) => {
          const [mouseX] = customEvent(
            event,
            () => mouse(event.currentTarget),
            {},
          );

          // not quite right position
          const xPositon =
            event.pageX -
            svgContainer.current.getBoundingClientRect().x +
            (40 + axisWidthAndHeight);

          const yPosition =
            event.pageY -
            svgContainer.current.getBoundingClientRect().y +
            axisWidthAndHeight;

          setMousePosition({x: xPositon, y: yPosition});

          const indexAtMouse = xScale.invert(mouseX - axisWidthAndHeight);

          const closestXValue = data
            .map((x) => x.x)
            .reduce((a, b) => {
              return Math.abs(b - indexAtMouse) < Math.abs(a - indexAtMouse)
                ? b
                : a;
            });

          setClosestXPosition(closestXValue);
        }}
      >
        {allData.map((item, index) => (
          <Line
            key={index}
            xScale={xScale}
            yScale={yScale}
            data={item}
            stroke={colors[index]}
          />
        ))}
        <XAxis xScale={xScale} />
        <YAxis yScale={yScale} />
      </svg>

      {closestXPosition == null ? null : (
        <div
          style={{
            position: 'absolute',
            display: 'block',
            left: mousePosition ? mousePosition.x : 0,
            top: mousePosition ? mousePosition.y : 0,
            background: 'white',
          }}
        >
          {currentValues.map((currentValue, i) => (
            <>
              <div>{`Line ${i} x value: ${currentValue[0].x}`}</div>
              <div>{`Line ${i} y value: ${currentValue[0].y}`}</div>
            </>
          ))}
        </div>
      )}
    </>
  );
}
