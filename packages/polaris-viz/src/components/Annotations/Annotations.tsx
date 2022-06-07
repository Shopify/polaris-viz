import React, {useMemo, useState} from 'react';
import type {ScaleBand} from 'd3-scale';

import type {Annotation, AnnotationLookupTable} from '../../types';
import {useSVGBlurEvent} from '../../hooks/useSVGBlurEvent';

import {
  AnnotationLabel,
  AnnotationLine,
  AnnotationContent,
  ShowMoreAnnotationsButton,
} from './components';
import {useAnnotationPositions} from './hooks/useAnnotationPositions';
import {PILL_HEIGHT} from './constants';
import {shouldHideAnnotation} from './utilities/shouldHideAnnotation';

interface Props {
  annotationsLookupTable: AnnotationLookupTable;
  drawableHeight: number;
  drawableWidth: number;
  labels: string[];
  onHeightChange: (height: number) => void;
  theme: string;
  xScale: ScaleBand<string>;
}

export function Annotations({
  annotationsLookupTable,
  drawableHeight,
  drawableWidth,
  labels,
  onHeightChange,
  theme,
  xScale,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isShowingAllAnnotations, setIsShowingAllAnnotations] = useState(false);
  const [ref, setRef] = useState<SVGGElement | null>(null);

  const {annotations, dataIndexes} = useMemo(() => {
    const dataIndexes = {};

    const annotations = Object.keys(annotationsLookupTable)
      .map((key) => {
        const annotation = annotationsLookupTable[key];

        if (annotation == null) {
          return null;
        }

        dataIndexes[key] = labels.indexOf(key);

        return annotation;
      })
      .filter(Boolean) as Annotation[];

    return {annotations, dataIndexes};
  }, [annotationsLookupTable, labels]);

  const {positions, rowCount} = useAnnotationPositions({
    annotations,
    axisLabelWidth: xScale.bandwidth(),
    dataIndexes,
    drawableWidth,
    isShowingAllAnnotations,
    onHeightChange,
    xScale,
  });

  const handleShowMoreAnnotations = () => {
    setIsShowingAllAnnotations(true);
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

  return (
    <g ref={setRef} tabIndex={-1}>
      {annotations.map((annotation, index) => {
        const {line, y, row} = positions[index];

        if (shouldHideAnnotation({row, isShowingAllAnnotations, rowCount})) {
          return null;
        }

        const hasContent = annotation.content != null;
        const isContentVisible = index === activeIndex && hasContent;
        const tabIndex = index + 1;
        const ariaLabel = `${annotation.startKey}`;

        return (
          <React.Fragment key={`annotation${index}${annotation.startKey}`}>
            <AnnotationLine
              size={drawableHeight}
              theme={theme}
              x={line.x}
              y={y + PILL_HEIGHT}
            />
            <AnnotationLabel
              ariaLabel={ariaLabel}
              index={index}
              isVisible={!isContentVisible}
              label={annotation.label}
              position={positions[index]}
              setActiveIndex={setActiveIndex}
              tabIndex={tabIndex}
              theme={theme}
            />
            {isContentVisible && (
              <AnnotationContent
                annotation={annotation}
                drawableWidth={drawableWidth}
                index={index}
                onMouseLeave={handleOnMouseLeave}
                parentRef={ref}
                position={positions[index]}
                tabIndex={tabIndex}
                theme={theme}
              />
            )}
          </React.Fragment>
        );
      })}
      {shouldHideAnnotation({row: 3, isShowingAllAnnotations, rowCount}) && (
        <ShowMoreAnnotationsButton
          label={`show +${rowCount - 3} more`}
          onClick={handleShowMoreAnnotations}
          theme={theme}
          width={drawableWidth}
        />
      )}
    </g>
  );
}
