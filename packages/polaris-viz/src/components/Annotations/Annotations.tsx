import React, {useEffect, useMemo, useState} from 'react';
import type {Color, DataSeries} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import type {AnnotationLookupTable} from '../../types';

import {
  AnnotationLabel,
  AnnotationLine,
  AnnotationContent,
  ShowMoreAnnotationsButton,
} from './components';
import {COLLAPSED_PILL_COUNT, PILL_HEIGHT, PILL_ROW_GAP} from './constants';
import {useAnnotations} from './hooks/useAnnotations';

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
  annotationsHeight: number;
  annotationsLookupTable: AnnotationLookupTable;
  colors: Color[];
  data: DataSeries[];
  drawableHeight: number;
  drawableWidth: number;
  onHeightChange: (height: number) => void;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  theme?: string;
}

export function Annotations({
  annotationsHeight,
  annotationsLookupTable,
  colors,
  data,
  drawableHeight,
  drawableWidth,
  onHeightChange,
  theme,
  xScale,
  yScale,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isShowingAllAnnotations, setIsShowingAllAnnotations] = useState(false);

  const {annotations, positions} = useAnnotations({
    annotationsHeight,
    annotationsLookupTable,
    barWidth: xScale.bandwidth(),
    colors,
    data,
    drawableHeight,
    drawableWidth,
    theme,
    xScale,
    yScale,
  });

  const totalRowHeight = useMemo(() => {
    return (
      positions.reduce((total, {y, row}) => {
        if (!isShowingAllAnnotations && row > COLLAPSED_PILL_COUNT) {
          return total;
        }

        if (y > total) {
          return y;
        }
        return total;
      }, 0) +
      PILL_HEIGHT +
      PILL_ROW_GAP
    );
  }, [isShowingAllAnnotations, positions]);

  const rowCount = useMemo(() => {
    return Math.max(...positions.map(({row}) => row)) + 1;
  }, [positions]);

  useEffect(() => {
    onHeightChange(totalRowHeight);
  }, [onHeightChange, totalRowHeight]);

  return (
    <React.Fragment>
      {annotations.map((annotation, index) => {
        if (
          shouldHideAnnotation({
            row: annotation.position.row,
            isShowingAllAnnotations,
            rowCount,
          })
        ) {
          return null;
        }

        const hasContent = annotation.content != null;
        const hideLabel = index === activeIndex && hasContent;

        return (
          <React.Fragment key={`annotation${index}${annotation.startIndex}`}>
            <AnnotationLine line={annotation.line} theme={theme} />
            {!hideLabel && (
              <AnnotationLabel
                index={index}
                label={annotation.label}
                position={annotation.position}
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
