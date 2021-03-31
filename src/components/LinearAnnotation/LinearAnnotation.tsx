import React, {useState} from 'react';
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
  barMargin: number;
}

const WIDTH = 80;
const HEIGHT = 50;

export function LinearAnnotation({
  linearAnnotation,
  axisMargin,
  drawableWidth,
  drawableHeight,
  barMargin,
}: Props) {
  const [showAnnotation, updateAnnotation] = useState(false);

  const scale = scaleLinear()
    .range([0, drawableWidth])
    .domain(linearAnnotation.range);

  const annotationPosition =
    scale(linearAnnotation.annotation) -
    (1 - barMargin / 2) * linearAnnotation.annotation;

  return (
    <React.Fragment>
      <circle
        cx={annotationPosition + 2.5}
        cy={drawableHeight + 40}
        r="6"
        stroke="#fff"
        strokeWidth="2"
        fill="#3A32B8"
        style={{cursor: 'pointer'}}
        onClick={() => updateAnnotation(!showAnnotation)}
      />

      <foreignObject
        width="80"
        height="60"
        x={annotationPosition + 4}
        y={drawableHeight - 15}
      >
        <div
          style={{
            background: '#fff',
            padding: '8px',
            borderRadius: '3px',
            // width: 'min-content',
            opacity: showAnnotation ? '1' : '0',
            fontSize: 12,
            transition: 'opacity 0.3s',
          }}
        >
          Median: 8.1
        </div>
      </foreignObject>
    </React.Fragment>
  );
}
