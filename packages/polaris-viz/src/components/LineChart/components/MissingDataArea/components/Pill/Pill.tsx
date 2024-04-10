import type {Position} from '@shopify/polaris-viz-core';
import {FONT_SIZE, LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {estimateStringWidthWithOffset} from '../../../../../../utilities/';
import {SingleTextLine} from '../../../../../Labels';
import {DescriptionPopover} from '../DescriptionPopover';

import styles from './Pill.scss';

const PX_OFFSET = 1;

const BUTTON_HEIGHT = 20;
const PILL_PADDING = 10;
const BUTTON_POSITION_OFFSET = 10;
const BUTTON_ITEM_GAP = 8;
const FONT_WEIGHT = 500;

const ICON_SIZE = 14;
const ICON_Y_OFFSET = (BUTTON_HEIGHT - ICON_SIZE) / 2;
const ICON_X_OFFSET = 8;

interface Props {
  containerWidth: number;
  label: string;
  description: string;
  x: number;
}

export function Pill({containerWidth, label, description, x}: Props) {
  const selectedTheme = useTheme();

  const [ref, setRef] = useState<SVGElement | null>(null);
  const [bounds, setBounds] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [isShowingDescription, setIsShowingDescription] = useState(false);

  const labelWidth = estimateStringWidthWithOffset(
    label,
    FONT_SIZE,
    FONT_WEIGHT,
  );

  function handleMouseEnter() {
    setIsShowingDescription(true);
  }

  function handleMouseLeave() {
    setIsShowingDescription(false);
  }

  const width = labelWidth + PILL_PADDING * 2;

  const updatePosition = useCallback(() => {
    const bounds = ref?.getBoundingClientRect();

    if (bounds == null) {
      return;
    }

    setBounds({
      x: bounds.left,
      y: bounds.top,
    });
  }, [ref]);

  const debouncedUpdatePosition = useDebouncedCallback(() => {
    updatePosition();
  }, 100);

  useLayoutEffect(() => {
    updatePosition();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdatePosition);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdatePosition);
      }
    };
  }, [updatePosition, debouncedUpdatePosition]);

  const pillWidth =
    ICON_X_OFFSET + BUTTON_ITEM_GAP + labelWidth + PILL_PADDING * 2;
  const isPillWiderThatContainer =
    pillWidth + BUTTON_POSITION_OFFSET * 2 > containerWidth;

  const xPosition = isPillWiderThatContainer ? x + containerWidth : x;

  return (
    <g
      className={styles.Group}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transform={`translate(${
        BUTTON_POSITION_OFFSET + xPosition
      },${BUTTON_POSITION_OFFSET})`}
    >
      <rect
        height={BUTTON_HEIGHT}
        width={pillWidth}
        fill={selectedTheme.badge.backgroundColor}
        ry={8}
        opacity={0.4}
        ref={setRef}
      />

      <Icon fill={selectedTheme.badge.textColor} />

      <SingleTextLine
        ariaHidden
        color={selectedTheme.badge.textColor}
        fontWeight={FONT_WEIGHT}
        text={label}
        targetWidth={width}
        y={BUTTON_HEIGHT - LINE_HEIGHT - PX_OFFSET}
        x={PILL_PADDING + ICON_X_OFFSET + BUTTON_ITEM_GAP}
      />

      {isShowingDescription && (
        <DescriptionPopover
          label={label}
          description={description}
          onMouseLeave={handleMouseLeave}
          yOffset={BUTTON_HEIGHT + BUTTON_ITEM_GAP}
          y={bounds.y}
          x={bounds.x}
        />
      )}
    </g>
  );
}

function Icon({fill}: {fill: string}) {
  return (
    <g transform={`translate(${ICON_X_OFFSET}, ${ICON_Y_OFFSET})`}>
      <path
        d="M6.99998 11C6.58577 11 6.24999 10.6642 6.25 10.25L6.25006 6.74999C6.25007 6.33577 6.58586 5.99999 7.00007 6C7.41428 6.00001 7.75006 6.3358 7.75006 6.75001L7.75 10.25C7.74999 10.6642 7.4142 11 6.99998 11Z"
        fill={fill}
      />
      <path
        d="M6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7Z"
        fill={fill}
      />
    </g>
  );
}
