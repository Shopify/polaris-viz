import {changeColorOpacity, clamp, useTheme} from '@shopify/polaris-viz-core';
import React, {useEffect, useState} from 'react';

import type {Annotation} from '../../../../types';
import type {AnnotationPosition} from '../../types';

import styles from './AnnotationContent.scss';

const MAX_WIDTH = 350;

interface Props {
  annotation: Annotation;
  drawableWidth: number;
  onMouseLeave: () => void;
  position: AnnotationPosition;
  theme?: string;
}

export function AnnotationContent({
  annotation,
  drawableWidth,
  onMouseLeave,
  position,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState<DOMRect | undefined>();

  useEffect(() => {
    setBounds(ref?.getBoundingClientRect());
  }, [ref]);

  if (annotation.content == null) {
    return null;
  }

  const {content, title, linkText = 'Learn more', linkUrl} = annotation.content;

  const width = bounds?.width ?? 0;
  let x = position.lineX - width / 2;

  if (x + width > drawableWidth) {
    x = drawableWidth - width;
  }

  return (
    <foreignObject
      height="100%"
      width="100%"
      style={{pointerEvents: 'none'}}
      x={clamp({amount: x, min: 0, max: drawableWidth})}
      y={position.y}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          className={styles.Container}
          data-block-tooltip-events
          onMouseLeave={onMouseLeave}
          ref={setRef}
          style={{
            maxWidth: Math.min(drawableWidth, MAX_WIDTH),
            background: changeColorOpacity(
              selectedTheme.annotations.backgroundColor,
              0.85,
            ),
          }}
        >
          {title != null && (
            <p
              className={styles.Title}
              style={{color: selectedTheme.annotations.titleColor}}
            >
              {title}
            </p>
          )}
          <p
            className={styles.Content}
            style={{color: selectedTheme.annotations.textColor}}
          >
            {content}

            {linkUrl != null && (
              <a href={linkUrl} className={styles.Link}>
                {linkText}
              </a>
            )}
          </p>
        </div>
      </div>
    </foreignObject>
  );
}
