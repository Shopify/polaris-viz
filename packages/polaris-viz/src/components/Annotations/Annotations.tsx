import React, {useMemo, useState} from 'react';
import type {ScaleBand} from 'd3-scale';

import type {Annotation, AnnotationLookupTable} from '../../types';

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
  onHeightChange: (height: number) => void;
  xScale: ScaleBand<string>;
  theme?: string;
}

export function Annotations({
  annotationsLookupTable,
  drawableHeight,
  drawableWidth,
  onHeightChange,
  theme,
  xScale,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isShowingAllAnnotations, setIsShowingAllAnnotations] = useState(false);

  const annotations = useMemo(() => {
    return Object.keys(annotationsLookupTable)
      .map((key) => {
        const annotation = annotationsLookupTable[Number(key)];

        if (annotation == null) {
          return null;
        }

        return annotation;
      })
      .filter(Boolean) as Annotation[];
  }, [annotationsLookupTable]);

  const {positions, rowCount} = useAnnotationPositions({
    annotations,
    axisLabelWidth: xScale.bandwidth(),
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

  return (
    <React.Fragment>
      {annotations.map((annotation, index) => {
        const {line, y, row} = positions[index];

        if (shouldHideAnnotation({row, isShowingAllAnnotations, rowCount})) {
          return null;
        }

        const hasContent = annotation.content != null;
        const hideLabel = index === activeIndex && hasContent;

        return (
          <React.Fragment key={`annotation${index}${annotation.startIndex}`}>
            <AnnotationLine
              size={drawableHeight}
              theme={theme}
              x={line.x}
              y={y + PILL_HEIGHT}
            />
            {!hideLabel && (
              <AnnotationLabel
                index={index}
                label={annotation.label}
                position={positions[index]}
                setActiveIndex={setActiveIndex}
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
      {activeIndex !== -1 && (
        <AnnotationContent
          annotation={annotations[activeIndex]}
          drawableWidth={drawableWidth}
          onMouseLeave={handleOnMouseLeave}
          position={positions[activeIndex]}
          theme={theme}
        />
      )}
    </React.Fragment>
  );
}
