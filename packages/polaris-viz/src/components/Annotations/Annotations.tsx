import React, {useMemo, useState} from 'react';
import {
  LinearGradientWithStops,
  uniqueId,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {ScaleBand} from 'd3-scale';

import type {Annotation, AnnotationLookupTable} from '../../types';

import {AnnotationLabel, AnnotationLine, AnnotationContent} from './components';
import {useAnnotationPositions} from './hooks/useAnnotationPositions';
import {PILL_HEIGHT} from './constants';

interface Props {
  annotationsLookupTable: AnnotationLookupTable;
  barWidth: number;
  drawableHeight: number;
  drawableWidth: number;
  onHeightChange: (height: number) => void;
  xScale: ScaleBand<string>;
  theme?: string;
}

export function Annotations({
  annotationsLookupTable,
  barWidth,
  drawableHeight,
  drawableWidth,
  onHeightChange,
  theme,
  xScale,
}: Props) {
  const selectedTheme = useTheme(theme);
  const gradientId = useMemo(() => uniqueId('annotation-line-gradient-'), []);
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
    barWidth,
    drawableWidth,
    onHeightChange,
    xScale,
  });

  return (
    <React.Fragment>
      <defs>
        <LinearGradientWithStops
          gradient={[
            {
              offset: 0,
              color: selectedTheme.annotations.backgroundColor,
            },
            {
              offset: 100,
              color: selectedTheme.annotations.backgroundColor,
              stopOpacity: 0,
            },
          ]}
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          y1="0%"
          y2="100%"
        />
      </defs>
      {annotations.map((annotation, index) => {
        const {lineX, y} = positions[index];

        const hideLabel = index === hoveredIndex && annotation.content != null;

        return (
          <React.Fragment key={`annotation${index}${annotation.startIndex}`}>
            <AnnotationLine
              color={`url(#${gradientId})`}
              drawableSize={drawableHeight}
              theme={theme}
              x={lineX}
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
