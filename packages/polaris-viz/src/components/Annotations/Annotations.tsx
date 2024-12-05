import {Fragment, useMemo, useState} from 'react';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import type {LabelFormatter} from '@shopify/polaris-viz-core';

import type {Annotation, AnnotationLookupTable} from '../../types';
import {useSVGBlurEvent} from '../../hooks/useSVGBlurEvent';
import {shouldHideAnnotation} from '../../utilities/shouldHideAnnotation';
import {isShowMoreAnnotationsButtonVisible} from '../../utilities/isShowMoreAnnotationsButtonVisible';

import {AnnotationLabel} from './components/AnnotationLabel/AnnotationLabel';
import {AnnotationLine} from './components/AnnotationLine/AnnotationLine';
import {AnnotationContent} from './components/AnnotationContent/AnnotationContent';
import {ShowMoreAnnotationsButton} from './components/ShowMoreAnnotationsButton/ShowMoreAnnotationsButton';
import {useAnnotationPositions} from './hooks/useAnnotationPositions';
import {PILL_HEIGHT, SHOW_MORE_BUTTON_OFFSET} from './constants';
import styles from './Annotations.scss';

export interface AnnotationsProps {
  annotationsLookupTable: AnnotationLookupTable;
  axisLabelWidth: number;
  drawableHeight: number;
  drawableWidth: number;
  labelFormatter: LabelFormatter;
  labels: string[];
  onHeightChange: (height: number) => void;
  xScale: ScaleLinear<number, number> | ScaleBand<string>;
}

export function Annotations({
  annotationsLookupTable,
  axisLabelWidth,
  drawableHeight,
  drawableWidth,
  labels,
  onHeightChange,
  xScale,
  labelFormatter,
}: AnnotationsProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isShowingAllAnnotations, setIsShowingAllAnnotations] = useState(false);
  const [ref, setRef] = useState<SVGGElement | null>(null);

  const formattedLabels = useMemo(
    () => labels.map(labelFormatter),
    [labels, labelFormatter],
  );

  const {annotations, dataIndexes} = useMemo(() => {
    const dataIndexes = {};

    const annotations = Object.keys(annotationsLookupTable)
      .map((key) => {
        const annotation = annotationsLookupTable[key];

        if (annotation == null || annotation.axis === 'y') {
          return null;
        }

        const formattedKey = labelFormatter(key);

        if (!formattedLabels.includes(formattedKey)) {
          return null;
        }

        dataIndexes[formattedKey] = formattedLabels.indexOf(formattedKey);

        return annotation;
      })
      .filter(Boolean) as Annotation[];

    return {annotations, dataIndexes};
  }, [annotationsLookupTable, formattedLabels, labelFormatter]);

  const {hiddenAnnotationsCount, positions, rowCount} = useAnnotationPositions({
    annotations,
    axisLabelWidth,
    dataIndexes,
    drawableWidth,
    isShowingAllAnnotations,
    onHeightChange,
    xScale,
    labelFormatter,
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
    <g ref={setRef} tabIndex={-1} className={styles.Group}>
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
