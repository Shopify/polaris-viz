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
import {COLLAPSED_PILL_COUNT, PILL_HEIGHT} from './constants';

function shouldHideAnnotation({
  row,
  isShowingAllAnnotations,
  rowCount,
}: {
  row: number;
  isShowingAllAnnotations: boolean;
  rowCount: number;
}) {
  if (isShowingAllAnnotations) {
    return false;
  }

  if (rowCount === COLLAPSED_PILL_COUNT) {
    return false;
  }

  if (rowCount > COLLAPSED_PILL_COUNT && row > COLLAPSED_PILL_COUNT - 1) {
    return true;
  }

  return false;
}

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
  const [hoveredIndex, setIsShowingContent] = useState(-1);
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

  return (
    <React.Fragment>
      {annotations.map((annotation, index) => {
        const {line, y, row} = positions[index];

        if (shouldHideAnnotation({row, isShowingAllAnnotations, rowCount})) {
          return null;
        }

        const hideLabel = index === hoveredIndex && annotation.content != null;

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
                setIsShowingContent={setIsShowingContent}
                theme={theme}
              />
            )}
          </React.Fragment>
        );
      })}
      {shouldHideAnnotation({row: 3, isShowingAllAnnotations, rowCount}) && (
        <ShowMoreAnnotationsButton
          label={`show +${rowCount - 3} more`}
          onClick={() => setIsShowingAllAnnotations(true)}
          theme={theme}
          width={drawableWidth}
        />
      )}
      {hoveredIndex !== -1 && (
        <AnnotationContent
          annotation={annotations[hoveredIndex]}
          drawableWidth={drawableWidth}
          onMouseLeave={() => setIsShowingContent(-1)}
          position={positions[hoveredIndex]}
        />
      )}
    </React.Fragment>
  );
}
