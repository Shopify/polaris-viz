import type {CSSProperties} from 'react';
import {Fragment, useMemo, useRef, useState} from 'react';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import type {
  Annotation,
  AnnotationLookupTable,
  RenderAnnotationContentData,
} from '../../types';
import {useSVGBlurEvent} from '../../hooks/useSVGBlurEvent';

import {AnnotationLabel, AnnotationLine, AnnotationContent} from './components';
import {useAnnotationPositions} from './hooks/useAnnotationPositions';
import {CONTENT_Y_OFFSET, LABEL_MOUSEOFF_DELAY, PILL_HEIGHT} from './constants';
import styles from './Annotations.scss';

export interface AnnotationsProps {
  annotationsLookupTable: AnnotationLookupTable;
  axisLabelWidth: number;
  drawableHeight: number;
  drawableWidth: number;
  labelFormatter: LabelFormatter;
  labels: string[];
  onHeightChange: (height: number) => void;
  renderAnnotationContent?: (
    data: RenderAnnotationContentData,
  ) => React.ReactNode;
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
  renderAnnotationContent,
}: AnnotationsProps) {
  const selectedTheme = useTheme();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [ref, setRef] = useState<SVGGElement | null>(null);
  const timeoutRef = useRef<number>(0);

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

  const positions = useAnnotationPositions({
    annotations,
    axisLabelWidth,
    dataIndexes,
    drawableWidth,
    onHeightChange,
    xScale,
    labelFormatter,
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
    <g ref={setRef} tabIndex={-1} className={styles.Group}>
      {positions.map((position) => {
        const {line, y, index} = position;
        const annotation = annotations[index];

        const hasContent = annotation.content != null;
        const isContentVisible = index === activeIndex && hasContent;
        const tabIndex = index + 1;
        const ariaLabel = `${annotation.startKey}`;

        return (
          <Fragment key={`annotation${index}${annotation.startKey}`}>
            <g
              className={styles.Pill}
              style={
                {
                  '--annotation-hover-color':
                    selectedTheme.annotations.backgroundHoverColor,
                  '--annotation-text-hover-color':
                    selectedTheme.annotations.textHoverColor,
                } as CSSProperties
              }
            >
              <AnnotationLine
                size={drawableHeight}
                x={line.x}
                y={y + PILL_HEIGHT}
              />
              <AnnotationLabel
                ariaLabel={ariaLabel}
                index={index}
                label={annotation.label}
                position={position}
                onMouseEnter={handleLabelMouseEnter}
                onMouseLeave={handleLabelMouseLeave}
                tabIndex={tabIndex}
              />
            </g>
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
                x={line.x}
                y={y + CONTENT_Y_OFFSET}
              />
            )}
          </Fragment>
        );
      })}
    </g>
  );
}
