import React from 'react';
import type {TooltipAnnotation} from 'types';

import {AnnotationRow} from '../AnnotationRow';

import styles from './Annotations.scss';

interface Props {
  activeIndex: number;
  annotations: TooltipAnnotation[];
  theme: string;
}

export function Annotations({activeIndex, annotations, theme}: Props) {
  if (annotations.length === 0) {
    return null;
  }

  return (
    <div className={styles.Container}>
      {annotations.map((annotation, index) => {
        return (
          <AnnotationRow
            activeIndex={activeIndex}
            key={`annotation-row-${index}`}
            index={index}
            label={annotation.key}
            theme={theme}
            value={annotation.value}
          />
        );
      })}
    </div>
  );
}
