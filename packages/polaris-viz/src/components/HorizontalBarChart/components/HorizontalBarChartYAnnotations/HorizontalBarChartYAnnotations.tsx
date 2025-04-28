import type {ReactNode} from 'react';
import {Fragment, useMemo, useRef, useState} from 'react';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  CONTENT_Y_OFFSET,
  LABEL_MOUSEOFF_DELAY,
} from '../../../Annotations/constants';
import {
  AnnotationContent,
  AnnotationLabel,
  AnnotationLine,
} from '../../../Annotations';
import type {
  Annotation,
  AnnotationLookupTable,
  RenderAnnotationContentData,
} from '../../../../types';
import {useSVGBlurEvent} from '../../../../hooks/useSVGBlurEvent';

import {useHorizontalBarChartYAnnotationsPositions} from './hooks/useHorizontalBarChartYAnnotationsPositions';

export interface YAxisAnnotationsProps {
  annotationsLookupTable: AnnotationLookupTable;
  drawableWidth: number;
  groupHeight: number;
  labels: string[];
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  zeroPosition: number;
}

export function HorizontalBarChartYAnnotations({
  annotationsLookupTable,
  drawableWidth,
  groupHeight,
  labels,
  renderAnnotationContent,
  zeroPosition,
}: YAxisAnnotationsProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [ref, setRef] = useState<SVGGElement | null>(null);
  const timeoutRef = useRef<number>(0);

  const {annotations, dataIndexes} = useMemo(() => {
    const dataIndexes = {};

    const annotations = Object.keys(annotationsLookupTable)
      .map((key) => {
        const annotation = annotationsLookupTable[key];

        if (
          !labels.includes(key) ||
          annotation == null ||
          annotation.axis === 'x'
        ) {
          return null;
        }

        dataIndexes[key] = labels.indexOf(key);

        return annotation;
      })
      .filter(Boolean) as Annotation[];

    return {annotations, dataIndexes};
  }, [annotationsLookupTable, labels]);

  const {positions} = useHorizontalBarChartYAnnotationsPositions({
    annotations,
    dataIndexes,
    drawableWidth,
    groupHeight,
    zeroPosition,
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
      <g transform={`translate(0, ${0})`}>
        {positions.map((position) => {
          const index = position.index;
          const annotation = annotations[index];

          const {line, x, y} = position;

          const hasContent = annotation.content != null;
          const isContentVisible = index === activeIndex && hasContent;
          const tabIndex = index + 1;
          const ariaLabel = `${annotation.startKey}`;

          return (
            <Fragment key={`annotation${index}${annotation.startKey}`}>
              <AnnotationLine
                direction="horizontal"
                hasCaret={false}
                size={drawableWidth - (drawableWidth - x)}
                x={line.x}
                y={line.y}
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
                  x={drawableWidth - (drawableWidth - x)}
                  y={y + CONTENT_Y_OFFSET}
                />
              )}
            </Fragment>
          );
        })}
      </g>
    </g>
  );
}
