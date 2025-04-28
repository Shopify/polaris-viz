import {Fragment, useMemo, useRef, useState} from 'react';
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
import type {OptionalDualAxisYAxis} from './types';
import styles from './Annotations.scss';
import {CONTENT_Y_OFFSET, LABEL_MOUSEOFF_DELAY} from './constants';

export interface YAxisAnnotationsProps {
  annotationsLookupTable: AnnotationLookupTable;
  drawableHeight: number;
  drawableWidth: number;
  ticks: YAxisTick[];
  yScale: ScaleLinear<number, number>;
  axis?: OptionalDualAxisYAxis;
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
  const timeoutRef = useRef<number>(0);

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

  function handleLabelMouseEnter(index: number) {
    setActiveIndex(index);
  }

  const handleLabelMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex(-1);
    }, LABEL_MOUSEOFF_DELAY);
  };

  function handleContentMouseEnter() {
    clearTimeout(timeoutRef.current);
  }

  useSVGBlurEvent({
    ref,
    onBlur: handleOnMouseLeave,
    checkFn: (activeElement) => {
      const focusedParent = activeElement?.parentElement;

      return focusedParent?.dataset.isAnnotationContent !== 'true';
    },
  });

  return (
    <g ref={setRef} tabIndex={-1} className={styles.Group}>
      {positions.map((position) => {
        const index = position.index;
        const annotation = annotations[index];

        const {line, x, y} = position;

        const hasContent = annotation.content != null;
        const isContentVisible = index === activeIndex && hasContent;
        const tabIndex = index + 1;
        const ariaLabel = `${annotation.startKey}`;

        const axisLabelX =
          axis === 'y2'
            ? drawableWidth + Y_AXIS_CHART_SPACING
            : -Y_AXIS_CHART_SPACING;

        return (
          <Fragment key={`annotation${index}${annotation.startKey}`}>
            {position.showYAxisLabel && (
              <AnnotationYAxisLabel
                axis={axis}
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
              index={index}
              label={annotation.label}
              position={position}
              onMouseEnter={handleLabelMouseEnter}
              onMouseLeave={handleLabelMouseLeave}
              tabIndex={tabIndex}
            />
            {isContentVisible && (
              <AnnotationContent
                annotation={annotation}
                drawableWidth={drawableWidth}
                index={index}
                onMouseEnter={handleContentMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                parentRef={ref}
                position={position}
                tabIndex={tabIndex}
                x={drawableWidth - (drawableWidth - x)}
                y={y + CONTENT_Y_OFFSET}
              />
            )}
          </Fragment>
        );
      })}
    </g>
  );
}
