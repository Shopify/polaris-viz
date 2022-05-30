import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {changeColorOpacity, clamp, useTheme} from '@shopify/polaris-viz-core';

import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';
import type {Annotation} from '../../../../types';
import type {AnnotationPosition} from '../../types';

import styles from './AnnotationContent.scss';

const MAX_WIDTH = 350;

interface Props {
  annotation: Annotation;
  drawableWidth: number;
  index: number;
  onMouseLeave: () => void;
  parentRef: SVGElement | null;
  position: AnnotationPosition;
  tabIndex: number;
  theme: string;
}

export function AnnotationContent({
  annotation,
  drawableWidth,
  index,
  onMouseLeave,
  parentRef,
  position,
  tabIndex,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);
  const {isFirefox} = useBrowserCheck();

  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState<DOMRect | undefined>();

  useLayoutEffect(() => {
    setBounds(ref?.getBoundingClientRect());
  }, [ref]);

  if (annotation.content == null) {
    return null;
  }

  const {content, title, linkText = 'Learn more', linkUrl} = annotation.content;

  const width = bounds?.width ?? 0;
  let x = position.line.x - width / 2;

  if (x + width > drawableWidth) {
    x = drawableWidth - width;
  }

  return createPortal(
    <foreignObject
      height="100%"
      width="100%"
      style={{pointerEvents: 'none'}}
      x={clamp({amount: x, min: 0, max: drawableWidth})}
      y={position.y}
    >
      <div
        className={styles.Container}
        data-block-tooltip-events
        onMouseLeave={onMouseLeave}
        ref={setRef}
        style={{
          maxWidth: Math.min(drawableWidth, MAX_WIDTH),
          // Firefox doesn't support blur so we'll remove
          // the opacity on this element.
          background: changeColorOpacity(
            selectedTheme.annotations.backgroundColor,
            isFirefox ? 1 : 0.85,
          ),
        }}
        id={`annotation-content-${index}`}
        role="dialog"
      >
        {title != null && (
          <p
            className={styles.Title}
            style={{color: selectedTheme.annotations.titleColor}}
            role="heading"
            aria-level={2}
          >
            {title}
          </p>
        )}
        <p
          className={styles.Content}
          style={{color: selectedTheme.annotations.textColor}}
          data-is-annotation-content
        >
          {content}

          {linkUrl != null && (
            <a href={linkUrl} className={styles.Link} tabIndex={tabIndex}>
              {linkText}
            </a>
          )}
        </p>
      </div>
    </foreignObject>,
    parentRef ?? document.body,
  );
}
