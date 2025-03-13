import type {ReactNode} from 'react';
import {Fragment, useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {isValueWithinDomain} from '@shopify/polaris-viz-core';

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
  ShowMoreAnnotationsButton,
  PILL_HEIGHT,
  SHOW_MORE_BUTTON_OFFSET,
} from '../../../Annotations';
import {isShowMoreAnnotationsButtonVisible} from '../../../../utilities/isShowMoreAnnotationsButtonVisible';
import {shouldHideAnnotation} from '../../../../utilities/shouldHideAnnotation';

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
  const [isShowingAllAnnotations, setIsShowingAllAnnotations] = useState(false);
  const [ref, setRef] = useState<SVGGElement | null>(null);

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

  const {hiddenAnnotationsCount, positions, rowCount} =
    useHorizontalBarChartXAnnotationPositions({
      annotations,
      drawableWidth,
      isShowingAllAnnotations,
      onHeightChange,
      xScale,
    });

  const handleToggleAllAnnotations = () => {
    setIsShowingAllAnnotations(!isShowingAllAnnotations);
  };

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

  const isShowMoreButtonVisible = isShowMoreAnnotationsButtonVisible(rowCount);
  const showMoreButtonOffset = isShowMoreButtonVisible
    ? SHOW_MORE_BUTTON_OFFSET
    : 0;

  return (
    <g ref={setRef} tabIndex={-1}>
      {isShowMoreButtonVisible && (
        <ShowMoreAnnotationsButton
          annotationsCount={hiddenAnnotationsCount}
          collapseText={annotations[0].collapseButtonText}
          expandText={annotations[0].expandButtonText}
          isShowingAllAnnotations={isShowingAllAnnotations}
          onClick={handleToggleAllAnnotations}
          tabIndex={annotations.length}
          width={drawableWidth}
        />
      )}
      <g transform={`translate(0, ${showMoreButtonOffset})`}>
        {positions.map((position) => {
          const {line, y, row, index} = position;
          const annotation = annotations[index];

          if (shouldHideAnnotation({row, isShowingAllAnnotations, rowCount})) {
            return null;
          }

          const hasContent = annotation.content != null;
          const isContentVisible = index === activeIndex && hasContent;
          const tabIndex = index + 1;
          const ariaLabel = `${annotation.startKey}`;

          return (
            <Fragment key={`annotation${index}${annotation.startKey}`}>
              <AnnotationLine
                size={drawableHeight - showMoreButtonOffset}
                x={line.x}
                y={y + PILL_HEIGHT}
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
                  renderAnnotationContent={renderAnnotationContent}
                  tabIndex={tabIndex}
                  x={line.x}
                  y={y}
                />
              )}
            </Fragment>
          );
        })}
      </g>
    </g>
  );
}
