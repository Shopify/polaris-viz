import React, {useCallback, useEffect, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';

import type {CellGroup} from '../types';
import {HIDE_NAME_AND_SECONDARY_VALUE_WIDTH_THRESHOLD} from '../utilities/constants';

import styles from './GroupCell.scss';
import {Background} from './Background';
import {GroupInfo} from './GroupInfo';

interface GroupCellProps {
  group: CellGroup;
  xScale: ScaleLinear<number, number>;
  cellHeight: number;
  cellWidth: number;
  isSmallContainer: boolean;
  hoveredGroups: Set<string>;
  handleGroupHover: (
    group: CellGroup | null,
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
  ) => void;
  getColors: (group: CellGroup) => {bgColor: string; textColor: string};
  containerWidth: number;
  isAnimated: boolean;
  index: number;
}

export const GroupCell: React.FC<GroupCellProps> = ({
  group,
  xScale,
  cellHeight,
  cellWidth,
  isSmallContainer,
  hoveredGroups,
  handleGroupHover,
  getColors,
  containerWidth,
  isAnimated,
  index,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const groupWidth = (group.end.col - group.start.col + 1) * cellWidth;
  const groupHeight = (group.end.row - group.start.row + 1) * cellHeight;
  const groupValue = group.value;
  const groupSecondaryValue = group.secondaryValue;

  const isHovered = hoveredGroups.size === 0 || hoveredGroups.has(group.name);
  const opacity = isHovered ? 1 : 0.3;

  const groupNameOffset = 10;
  const showNameAndSecondaryValue =
    containerWidth > HIDE_NAME_AND_SECONDARY_VALUE_WIDTH_THRESHOLD;
  const mainFontSize = showNameAndSecondaryValue
    ? 20
    : Math.min(groupWidth, cellHeight) / 4;
  const secondaryFontSize = mainFontSize * 0.6;

  const groupX = xScale(group.start.col);
  const groupY = group.start.row * cellHeight;

  const staggerDelay = 40;
  const cellStyle =
    isAnimated && !prefersReducedMotion
      ? {
          transformOrigin: `${groupX + groupWidth / 2}px ${
            groupY + groupHeight / 2
          }px`,
          animationDelay: `${index * staggerDelay}ms`,
        }
      : null;

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  }, []);

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      if (!isSmallContainer) {
        handleGroupHover(null, event);
      }
    },
    [isSmallContainer, handleGroupHover],
  );

  const ariaLabel = `${group.name}, ${group.value}, ${
    group.secondaryValue
  }${`, ${group.description || ''}${group.goal ? `, ${group.goal}` : ''}`}`;

  return (
    <g
      className={styles.GroupCellContainer}
      style={{opacity}}
      role="button"
      data-testid="group-cell"
      onMouseEnter={(event) => handleGroupHover(group, event)}
      onMouseLeave={handleMouseLeave}
      onFocus={(event) => handleGroupHover(group, event)}
      onBlur={(event) => handleGroupHover(null, event)}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <g
        className={
          isAnimated && !prefersReducedMotion
            ? `${styles.GroupCell}`
            : undefined
        }
        style={{...cellStyle, opacity}}
      >
        <Background
          x={groupX}
          y={groupY}
          width={groupWidth}
          height={groupHeight}
          fill={getColors(group).bgColor}
          opacity={opacity}
        />

        <GroupInfo
          groupX={groupX}
          groupY={groupY}
          group={group}
          groupWidth={groupWidth}
          groupHeight={groupHeight}
          getColors={getColors}
          mainFontSize={mainFontSize}
          groupValue={groupValue}
          showNameAndSecondaryValue={showNameAndSecondaryValue}
          secondaryFontSize={secondaryFontSize}
          groupSecondaryValue={groupSecondaryValue}
          groupNameOffset={groupNameOffset}
          opacity={opacity}
        />
      </g>
    </g>
  );
};
