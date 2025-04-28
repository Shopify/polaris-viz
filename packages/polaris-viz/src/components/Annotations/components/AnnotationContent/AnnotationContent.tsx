import {Fragment, useEffect, useLayoutEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {clamp, useTheme} from '@shopify/polaris-viz-core';

import type {Annotation, RenderAnnotationContentData} from '../../../../types';
import type {AnnotationPosition} from '../../types';

import styles from './AnnotationContent.scss';

const MAX_WIDTH = 350;

export interface AnnotationContentProps {
  annotation: Annotation;
  drawableWidth: number;
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  parentRef: SVGElement | null;
  position: AnnotationPosition;
  renderAnnotationContent?: (
    data: RenderAnnotationContentData,
  ) => React.ReactNode;
  tabIndex: number;
  x: number;
  y: number;
}

export function AnnotationContent({
  annotation,
  drawableWidth,
  index,
  onMouseEnter,
  onMouseLeave,
  parentRef,
  tabIndex,
  renderAnnotationContent,
  x,
  y,
}: AnnotationContentProps) {
  const selectedTheme = useTheme();

  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState<DOMRect | undefined>();

  useLayoutEffect(() => {
    setBounds(ref?.getBoundingClientRect());
  }, [ref]);

  useEffect(() => {
    const tooltip = document.querySelector<HTMLElement>('[data-tooltip]');

    if (tooltip) {
      tooltip.style.display = 'none';
    }

    return () => {
      if (tooltip) {
        tooltip.style.display = 'block';
      }
    };
  }, []);

  if (annotation.content == null) {
    return null;
  }

  const {content, title, linkText = 'Learn more', linkUrl} = annotation.content;

  const width = bounds?.width ?? 0;
  let xPosition = x - width / 2;

  if (xPosition + width > drawableWidth) {
    xPosition = drawableWidth - width;
  }

  return createPortal(
    <Wrapper
      height="100%"
      width="100%"
      style={{pointerEvents: 'none', overflow: 'visible'}}
      x={clamp({amount: xPosition, min: 0, max: drawableWidth})}
      y={y}
      parentRef={parentRef}
    >
      <div
        className={styles.Container}
        data-block-tooltip-events
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={setRef}
        style={{
          width: 'fit-content',
          maxWidth: Math.min(drawableWidth, MAX_WIDTH),
          background: selectedTheme.tooltip.backgroundColor,
          color: selectedTheme.tooltip.textColor,
        }}
        id={`annotation-content-${index}`}
        role="dialog"
        aria-label={content}
      >
        {title != null && (
          <p
            className={styles.Title}
            style={{color: selectedTheme.tooltip.textColor}}
            role="heading"
            aria-level={2}
          >
            {title}
          </p>
        )}
        <div
          className={styles.Content}
          style={{color: selectedTheme.tooltip.textColor}}
          data-is-annotation-content
        >
          {renderAnnotationContent ? (
            renderAnnotationContent({annotation})
          ) : (
            <Fragment>
              <p style={{color: selectedTheme.tooltip.textColor}}>{content}</p>

              {linkUrl != null && (
                <a
                  href={linkUrl}
                  className={styles.Link}
                  tabIndex={tabIndex}
                  style={{color: selectedTheme.annotations.linkColor}}
                >
                  {linkText}
                </a>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Wrapper>,
    parentRef ?? document.body,
  );
}

function Wrapper({children, parentRef, ...theRest}) {
  const Tag = parentRef ? 'foreignObject' : 'div';

  return <Tag {...theRest}>{children}</Tag>;
}
