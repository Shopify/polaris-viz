import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import styles from '../Grid.scss';

import {Background} from './Background';
import {GroupInfo} from './GroupInfo';

interface GroupCellProps {
  group: CellGroup;
  xScale: ScaleLinear<number, number>;
  cellHeight: number;
  cellWidth: number;
  isSmallContainer: boolean;
  hoveredGroups: Set<string>;
  handleGroupHover: (group: CellGroup | null, event: React.MouseEvent) => void;
  getColors: (group: CellGroup | null) => {bgColor: string; textColor: string};
  containerWidth: number;
  isAnimated: boolean;
}

interface CellGroup {
  start: {row: number; col: number};
  end: {row: number; col: number};
  bgColor: string;
  color: string;
  name: string;
  value: string;
  secondaryValue: string;
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
}) => {
  const groupWidth = (group.end.col - group.start.col + 1) * cellWidth;
  const groupHeight = (group.end.row - group.start.row + 1) * cellHeight;
  const groupValue = group.value;
  const groupSecondaryValue = group.secondaryValue;

  const isActive = hoveredGroups.size === 0 || hoveredGroups.has(group.name);
  const opacity = isActive ? 1 : 0.3;

  const groupNameOffset = 10;
  const showNameAndSecondaryValue = containerWidth > 500;
  const mainFontSize = showNameAndSecondaryValue
    ? 20
    : Math.min(groupWidth, cellHeight) / 4;
  const secondaryFontSize = mainFontSize * 0.6;

  const groupX = xScale(group.start.col);
  const groupY = group.start.row * cellHeight;

  const cellStyle = isAnimated
    ? {
        transformOrigin: `${groupX + groupWidth / 2}px ${
          groupY + groupHeight / 2
        }px`,
      }
    : {
        opacity: 1,
        transform: 'scale(1)',
      };

  return (
    <g
      data-testid="group-cell"
      onMouseEnter={(event) => handleGroupHover(group, event)}
      onMouseLeave={(event) => {
        if (!isSmallContainer) {
          handleGroupHover(null, event);
        }
      }}
      className={isAnimated ? `${styles.GroupCell}` : undefined}
      style={{...cellStyle, opacity}}
      aria-label={group.name}
      role="group"
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
        opacity={opacity}
        mainFontSize={mainFontSize}
        groupValue={groupValue}
        showNameAndSecondaryValue={showNameAndSecondaryValue}
        secondaryFontSize={secondaryFontSize}
        groupSecondaryValue={groupSecondaryValue}
        groupNameOffset={groupNameOffset}
      />
    </g>
  );
};
