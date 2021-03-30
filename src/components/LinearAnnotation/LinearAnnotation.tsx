import React from 'react';
import {scaleLinear} from 'd3-scale';

interface Props {
  linearAnnotation: {
    range: [number, number];
    annotation: number;
    description: string;
  };
  axisMargin: number;
  drawableWidth: number;
  chartHeight: number;
}

const WIDTH = 80;
const HEIGHT = 50;

export function LinearAnnotation({
  linearAnnotation,
  axisMargin,
  drawableWidth,
  drawableHeight,
}: Props) {
  const scale = scaleLinear()
    .range([0, drawableWidth])
    .domain(linearAnnotation.range);

  const annotationPosition = scale(linearAnnotation.annotation);

  return (
    <React.Fragment>
      <line
        stroke="#E4E5E7"
        y2={drawableHeight + HEIGHT}
        transform={`translate(${axisMargin + annotationPosition}, 0)`}
        stroke-width="3"
        stroke-linecap="round"
        strokeDasharray="0.1, 8"
      />
      <g
        transform={`translate(${axisMargin +
          annotationPosition -
          WIDTH / 2}, 0)`}
      >
        <foreignObject width={WIDTH} height={HEIGHT}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                background: '#E4E5E7',
                borderRadius: '3px',
                padding: '5px',
                fontSize: '10px',
                // width: 'min-content',
              }}
            >
              {linearAnnotation.description}
            </div>
          </div>
        </foreignObject>
      </g>
    </React.Fragment>
  );
}
