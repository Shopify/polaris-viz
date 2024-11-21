import React, {useCallback, useEffect, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';

import type {CellGroup} from '../types';
import {
  HIDE_NAME_AND_SECONDARY_VALUE_HEIGHT_THRESHOLD,
  HIDE_NAME_AND_SECONDARY_VALUE_WIDTH_THRESHOLD,
} from '../utilities/constants';
import {classNames} from '../../../utilities';

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
  handleGroupHover: (group: CellGroup | null) => void;
  groupSelected: CellGroup | null;
  handleSelectGroup: (group: CellGroup | null) => void;
  getColors: (group: CellGroup) => {bgColor: string; textColor: string};
  containerWidth: number;
  containerHeight: number;
  isAnimated: boolean;
  index: number;
  dimensions: {width: number; height: number};
}

export const GroupCell: React.FC<GroupCellProps> = ({
  group,
  xScale,
  cellHeight,
  cellWidth,
  isSmallContainer,
  hoveredGroups,
  handleGroupHover,
  groupSelected,
  handleSelectGroup,
  getColors,
  containerWidth,
  containerHeight,
  isAnimated,
  index,
  dimensions,
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

  const isHovered = hoveredGroups.size === 0 || hoveredGroups.has(group.id);
  const opacity = isHovered ? 1 : 0.3;

  const groupNameOffset = 10;
  const showNameAndSecondaryValue =
    containerWidth > HIDE_NAME_AND_SECONDARY_VALUE_WIDTH_THRESHOLD &&
    containerHeight > HIDE_NAME_AND_SECONDARY_VALUE_HEIGHT_THRESHOLD;
  const mainFontSize = showNameAndSecondaryValue ? 20 : 16;
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

  const handleMouseLeave = useCallback(() => {
    if (!isSmallContainer) {
      handleGroupHover(null);
    }
  }, [isSmallContainer, handleGroupHover]);

  const ariaLabel = `${group.name}, ${group.value}, ${
    group.secondaryValue
  }${`, ${group.description || ''}${group.goal ? `, ${group.goal}` : ''}`}`;

  return (
    <g
      className={classNames(
        styles.GroupCellContainer,
        groupSelected?.id === group.id && styles.GroupCellContainerSelected,
      )}
      id={group.id}
      style={{opacity}}
      role="button"
      data-testid="group-cell"
      data-disabled={group.value === null}
      onClick={() => {
        if (group.value !== null) {
          handleSelectGroup(group);
        }
      }}
      onMouseEnter={() => {
        if (!groupSelected) {
          handleGroupHover(group);
        }
      }}
      onMouseLeave={() => {
        if (!groupSelected) {
          handleMouseLeave();
        }
      }}
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
          isDisabled={group.value === null}
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
          dimensions={dimensions}
        />
      </g>
    </g>
  );
};
