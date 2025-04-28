import type {ReactNode} from 'react';
import {Fragment, useMemo, useRef, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {isValueWithinDomain} from '@shopify/polaris-viz-core';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  CONTENT_Y_OFFSET,
  LABEL_MOUSEOFF_DELAY,
} from '../../../Annotations/constants';
import type {
  Annotation,
  AnnotationLookupTable,
  RenderAnnotationContentData,
} from '../../../../types';
import {useSVGBlurEvent} from '../../../../hooks/useSVGBlurEvent';
import {
  AnnotationLabel,
  AnnotationLine,
  AnnotationContent,
  PILL_HEIGHT,
} from '../../../Annotations';

import {useHorizontalBarChartXAnnotationPositions} from './hooks/useHorizontalBarChartXAnnotationPositions';

export interface AnnotationsProps {
  annotationsLookupTable: AnnotationLookupTable;
  drawableHeight: number;
  drawableWidth: number;
  onHeightChange: (height: number) => void;
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  xScale: ScaleLinear<number, number>;
}

export function HorizontalBarChartXAnnotations({
  annotationsLookupTable,
  drawableHeight,
  drawableWidth,
  onHeightChange,
  renderAnnotationContent,
  xScale,
}: AnnotationsProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [ref, setRef] = useState<SVGGElement | null>(null);
  const timeoutRef = useRef<number>(0);

  const {annotations} = useMemo(() => {
    const annotations = Object.keys(annotationsLookupTable)
      .map((key) => {
        const annotation = annotationsLookupTable[key];

        if (
          !isValueWithinDomain(Number(annotation.startKey), xScale.domain())
        ) {
          return null;
        }

        if (
          annotation == null ||
          annotation.axis == null ||
          annotation.axis === 'y'
        ) {
          return null;
        }

        return annotation;
      })
      .filter(Boolean) as Annotation[];

    return {annotations};
  }, [annotationsLookupTable, xScale]);

  const positions = useHorizontalBarChartXAnnotationPositions({
    annotations,
    drawableWidth,
    onHeightChange,
    xScale,
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
    <g ref={setRef} tabIndex={-1}>
      {positions.map((position) => {
        const {line, y, index} = position;
        const annotation = annotations[index];

        const hasContent = annotation.content != null;
        const isContentVisible = index === activeIndex && hasContent;
        const tabIndex = index + 1;
        const ariaLabel = `${annotation.startKey}`;

        return (
          <Fragment key={`annotation${index}${annotation.startKey}`}>
            <AnnotationLine
              size={drawableHeight}
              x={line.x}
              y={y + PILL_HEIGHT}
            />
            <AnnotationLabel
              ariaLabel={ariaLabel}
              index={index}
              label={annotation.label}
              onMouseEnter={handleLabelMouseEnter}
              onMouseLeave={handleLabelMouseLeave}
              position={position}
              tabIndex={tabIndex}
            />
            {isContentVisible && (
              <AnnotationContent
                annotation={annotation}
                drawableWidth={drawableWidth}
                index={index}
                onMouseEnter={handleContentMouseEnter}
                onMouseLeave={handleLabelMouseLeave}
                parentRef={ref}
                position={position}
                renderAnnotationContent={renderAnnotationContent}
                tabIndex={tabIndex}
                x={line.x}
                y={y + CONTENT_Y_OFFSET}
              />
            )}
          </Fragment>
        );
      })}
    </g>
  );
}
