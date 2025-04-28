import {Fragment} from 'react';
import {FONT_SIZE, LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';

import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';
import {SingleTextLine} from '../../../Labels';
import {PILL_HEIGHT, PILL_PADDING} from '../../constants';
import type {AnnotationPosition} from '../../types';

import styles from './AnnotationLabel.scss';

export interface AnnotationLabelProps {
  ariaLabel: string;
  index: number;
  label: string;
  position: AnnotationPosition;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  tabIndex: number;
}

const PX_OFFSET = 1;
const BORDER_RADIUS = 4;

export function AnnotationLabel({
  ariaLabel,
  index,
  label,
  position,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
}: AnnotationLabelProps) {
  const selectedTheme = useTheme();
  const {isFirefox} = useBrowserCheck();

  const {x, y, width} = position;

  const formattedAriaLabel = `${ariaLabel}: ${label}`;

  const centerX = width / 2;

  function handleMouseEnter() {
    onMouseEnter(index);
  }

  return (
    <g transform={`translate(${x},${y})`} aria-hidden>
      <rect
        height={PILL_HEIGHT}
        width={width}
        fill={selectedTheme.annotations.backgroundColor}
        ry={BORDER_RADIUS}
        opacity={isFirefox ? 1 : selectedTheme.annotations.pillOpacity}
      />

      <SingleTextLine
        ariaHidden
        color={selectedTheme.annotations.textColor}
        fontSize={FONT_SIZE}
        text={label}
        targetWidth={width - PILL_PADDING * 2 + PX_OFFSET}
        y={PILL_HEIGHT - LINE_HEIGHT - PX_OFFSET}
        x={centerX}
      />

      <Fragment>
        <foreignObject
          height={PILL_HEIGHT}
          width={width}
          style={{overflow: 'visible'}}
        >
          <button
            aria-describedby={`annotation-content-${index}`}
            aria-label={formattedAriaLabel}
            className={styles.Button}
            onMouseEnter={handleMouseEnter}
            onFocus={handleMouseEnter}
            onMouseLeave={onMouseLeave}
            onBlur={onMouseLeave}
            tabIndex={tabIndex}
            style={{borderRadius: BORDER_RADIUS}}
          >
            {label}
          </button>
        </foreignObject>
      </Fragment>
    </g>
  );
}
