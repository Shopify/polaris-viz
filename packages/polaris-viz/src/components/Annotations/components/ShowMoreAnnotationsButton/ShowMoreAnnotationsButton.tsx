import {FONT_SIZE, LINE_HEIGHT, useTheme} from '@shopify/polaris-viz-core';

import {PILL_HEIGHT, PILL_PADDING, PILL_X_MIN} from '../../constants';
import {SingleTextLine} from '../../../Labels';

import styles from './ShowMoreAnnotationsButton.scss';
import {Icon, Shadow} from './components';

const STROKE = 2;

export interface Props {
  annotationsCount: number;
  isShowingAllAnnotations: boolean;
  onClick: () => void;
  tabIndex: number;
  width: number;
  collapseText?: string;
  expandText?: string;
}

export function ShowMoreAnnotationsButton({
  annotationsCount,
  collapseText = 'Collapse annotations',
  expandText = 'Expand annotations',
  isShowingAllAnnotations,
  onClick,
  tabIndex,
  width,
}: Props) {
  const selectedTheme = useTheme();

  const label = isShowingAllAnnotations
    ? collapseText
    : `${expandText} (${annotationsCount})`;

  const radius = PILL_HEIGHT / 2;
  const pillWidth = width + Math.abs(PILL_X_MIN);
  const pillHeight = PILL_HEIGHT + STROKE;

  return (
    <g
      className={styles.Button}
      transform={`translate(${PILL_X_MIN},-1)`}
      onClick={onClick}
      tabIndex={0}
    >
      {!isShowingAllAnnotations && (
        <Shadow
          height={pillHeight}
          width={pillWidth}
          fill={selectedTheme.annotations.backgroundColor}
          radius={radius}
        />
      )}

      <rect
        height={pillHeight}
        width={pillWidth}
        fill={
          isShowingAllAnnotations
            ? 'transparent'
            : selectedTheme.annotations.backgroundColor
        }
        ry={radius}
        stroke={
          isShowingAllAnnotations
            ? selectedTheme.annotations.backgroundColor
            : selectedTheme.chartContainer.backgroundColor
        }
        strokeWidth={STROKE}
      />

      <Icon
        fill={
          isShowingAllAnnotations
            ? selectedTheme.annotations.backgroundColor
            : selectedTheme.annotations.textColor
        }
        isShowingAllAnnotations={isShowingAllAnnotations}
      />

      <SingleTextLine
        color={
          isShowingAllAnnotations
            ? selectedTheme.annotations.backgroundColor
            : selectedTheme.annotations.textColor
        }
        fontSize={FONT_SIZE}
        text={label}
        targetWidth={pillWidth - PILL_PADDING * 2}
        y={PILL_HEIGHT - LINE_HEIGHT}
        x={pillWidth / 2}
      />

      <foreignObject
        height={PILL_HEIGHT}
        width={pillWidth}
        style={{overflow: 'visible'}}
      >
        <button
          className={styles.Button}
          onClick={onClick}
          style={{borderRadius: PILL_HEIGHT / 2}}
          tabIndex={tabIndex}
        >
          {label}
        </button>
      </foreignObject>
    </g>
  );
}
