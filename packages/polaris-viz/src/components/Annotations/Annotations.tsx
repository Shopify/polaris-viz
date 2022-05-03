import React, {useMemo, useState} from 'react';
import type {ScaleBand} from 'd3-scale';

import type {Annotation, AnnotationLookupTable} from '../../types';

import {AnnotationLabel, AnnotationLine, AnnotationContent} from './components';
import {useAnnotationPositions} from './hooks/useAnnotationPositions';
import {PILL_HEIGHT} from './constants';

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

  const positions = useAnnotationPositions({
    annotations,
    axisLabelWidth: xScale.bandwidth(),
    drawableWidth,
    onHeightChange,
    xScale,
  });

  return (
    <React.Fragment>
      {annotations.map((annotation, index) => {
        const {line, y} = positions[index];

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
