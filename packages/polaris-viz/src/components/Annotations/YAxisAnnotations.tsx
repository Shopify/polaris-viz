import React, {useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  isValueWithinDomain,
  Y_AXIS_CHART_SPACING,
} from '@shopify/polaris-viz-core';

import type {Annotation, AnnotationLookupTable, YAxisTick} from '../../types';
import {useSVGBlurEvent} from '../../hooks/useSVGBlurEvent';

import {useYAxisAnnotationPositions} from './hooks/useYAxisAnnotationPositions';
import {
  AnnotationContent,
  AnnotationLabel,
  AnnotationLine,
  AnnotationYAxisLabel,
} from './components';

const Y_OFFSET = 13;

export interface YAxisAnnotationsProps {
  annotationsLookupTable: AnnotationLookupTable;
  drawableHeight: number;
  drawableWidth: number;
  ticks: YAxisTick[];
  yScale: ScaleLinear<number, number>;
  axis?: 'y' | 'y1' | 'y2';
}

export function YAxisAnnotations({
  axis = 'y',
  annotationsLookupTable,
  drawableWidth,
  ticks,
  yScale,
}: YAxisAnnotationsProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [ref, setRef] = useState<SVGGElement | null>(null);

  const {annotations} = useMemo(() => {
    const annotations = Object.keys(annotationsLookupTable)
      .map((key) => {
        const annotation = annotationsLookupTable[key];

        if (
          !isValueWithinDomain(Number(annotation.startKey), yScale.domain())
        ) {
          return null;
        }

        if (
          annotation == null ||
          annotation.axis == null ||
          annotation.axis !== axis
        ) {
          return null;
        }

        return annotation;
      })
      .filter(Boolean) as Annotation[];

    return {annotations};
  }, [annotationsLookupTable, yScale, axis]);

  const {positions} = useYAxisAnnotationPositions({
    axis,
    annotations,
    drawableWidth,
    ticks,
    yScale,
  });

  const handleOnMouseLeave = () => {
    setActiveIndex(-1);
  };

  useSVGBlurEvent({
    ref,
    onBlur: handleOnMouseLeave,
    checkFn: (activeElement) => {
      const focusedParent = activeElement?.parentElement;

      return focusedParent?.dataset.isAnnotationContent !== 'true';
    },
  });

  return (
    <g ref={setRef} tabIndex={-1}>
      <g transform={`translate(0, ${0})`}>
        {positions.map((position) => {
          const index = position.index;
          const annotation = annotations[index];

          const {line, x, y, width} = position;

          const hasContent = annotation.content != null;
          const isContentVisible = index === activeIndex && hasContent;
          const tabIndex = index + 1;
          const ariaLabel = `${annotation.startKey}`;

          const axisLabelX =
            axis === 'y2'
              ? drawableWidth + Y_AXIS_CHART_SPACING
              : -width - Y_OFFSET;

          return (
            <React.Fragment key={`annotation${index}${annotation.startKey}`}>
              {position.showYAxisLabel && (
                <AnnotationYAxisLabel
                  y={line.y}
                  x={axisLabelX}
                  label={annotation.startKey}
                />
              )}
              <AnnotationLine
                direction="horizontal"
                hasCaret={false}
                size={line.width ?? 0}
                x={line.x}
                y={line.y}
              />
              <AnnotationLabel
                ariaLabel={ariaLabel}
                hasContent={hasContent}
                index={index}
                isVisible={!isContentVisible}
                label={annotation.label}
                position={position}
                setActiveIndex={setActiveIndex}
                tabIndex={tabIndex}
              />
              {isContentVisible && (
                <AnnotationContent
                  annotation={annotation}
                  drawableWidth={drawableWidth}
                  index={index}
                  onMouseLeave={handleOnMouseLeave}
                  parentRef={ref}
                  position={position}
                  tabIndex={tabIndex}
                  x={drawableWidth - (drawableWidth - x)}
                  y={y}
                />
              )}
            </React.Fragment>
          );
        })}
      </g>
    </g>
  );
}
