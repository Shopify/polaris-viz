import React, {useMemo, useState} from 'react';
import {
  LinearGradientWithStops,
  uniqueId,
  useTheme,
} from '@shopify/polaris-viz-core';
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
    barWidth,
    drawableWidth,
    isShowingAllAnnotations,
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
        const {lineX, y, row} = positions[index];

        if (shouldHideAnnotation({row, isShowingAllAnnotations, rowCount})) {
          return null;
        }

        const hasContent = annotation.content != null;
        const hideLabel = index === activeIndex && hasContent;

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
          onClick={() => setIsShowingAllAnnotations(true)}
          theme={theme}
          width={drawableWidth}
        />
      )}
      {activeIndex !== -1 && (
        <AnnotationContent
          annotation={annotations[activeIndex]}
          drawableWidth={drawableWidth}
          onMouseLeave={() => setActiveIndex(-1)}
          position={positions[activeIndex]}
          theme={theme}
        />
      )}
    </React.Fragment>
  );
}
