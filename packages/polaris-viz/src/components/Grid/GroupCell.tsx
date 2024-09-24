import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import styles from './Grid.scss';

interface GroupCellProps {
  group: CellGroup;
  index: number;
  xScale: ScaleLinear<number, number>;
  cellHeight: number;
  cellWidth: number;
  isSmallContainer: boolean;
  animationStarted: boolean;
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
  index,
  xScale,
  cellHeight,
  cellWidth,
  isSmallContainer,
  animationStarted,
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

  const isMainActive = hoveredGroups.has(group.name);
  const isActive = hoveredGroups.size > 0 && isMainActive;

  const opacity = isActive || hoveredGroups.size === 0 ? 1 : 0.3;
  const cellOpacity = isActive || hoveredGroups.size === 0 ? 1 : 0.3;

  const groupNameOffset = 10;
  const showNameAndSecondaryValue = containerWidth > 500;
  const mainFontSize = showNameAndSecondaryValue
    ? 20
    : Math.min(groupWidth, cellHeight) / 4;
  const secondaryFontSize = mainFontSize * 0.6;

  const animationDelay =
    isAnimated && animationStarted ? `${index * 50}ms` : '0ms';

  const cellStyle = isAnimated
    ? {
        '--animation-delay': animationDelay,
        '--animation-scale': animationStarted ? 1 : 0.5,
        '--animation-opacity': animationStarted ? 1 : 0,
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
      className={
        isAnimated ? `${styles.animatedArrow} ${styles.groupCell}` : undefined
      }
      style={cellStyle}
    >
      <Background
        x={xScale(group.start.col)}
        y={group.start.row * cellHeight}
        width={groupWidth}
        height={groupHeight}
        fill={getColors(group).bgColor}
        opacity={cellOpacity}
      />

      <GroupInfo
        {...{
          xScale,
          group,
          groupWidth,
          cellHeight,
          groupHeight,
          getColors,
          opacity,
          mainFontSize,
          groupValue,
          showNameAndSecondaryValue,
          secondaryFontSize,
          groupSecondaryValue,
          groupNameOffset,
        }}
      />
    </g>
  );
};

export const Background = ({
  x,
  y,
  width,
  height,
  fill,
  opacity,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
}) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
    stroke="white"
    strokeWidth="4"
    rx="4"
    ry="4"
  />
);

interface GroupInfoProps {
  xScale: (value: number) => number;
  group: {
    start: {col: number; row: number};
    name: string;
  };
  groupWidth: number;
  cellHeight: number;
  groupHeight: number;
  getColors: (group: any) => {textColor: string};
  opacity: number;
  mainFontSize: number;
  groupValue: string;
  showNameAndSecondaryValue: boolean;
  secondaryFontSize: number;
  groupSecondaryValue: string;
  groupNameOffset: number;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({
  xScale,
  group,
  groupWidth,
  cellHeight,
  groupHeight,
  getColors,
  opacity,
  mainFontSize,
  groupValue,
  showNameAndSecondaryValue,
  secondaryFontSize,
  groupSecondaryValue,
  groupNameOffset,
}) => {
  return (
    <React.Fragment>
      <text
        x={xScale(group.start.col) + groupWidth / 2}
        y={group.start.row * cellHeight + groupHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={getColors(group).textColor}
        opacity={opacity}
      >
        <tspan fontWeight={600} fontSize={`${mainFontSize}px`}>
          {groupValue}
        </tspan>
        {showNameAndSecondaryValue && (
          <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
            {groupSecondaryValue}
          </tspan>
        )}
      </text>

      {showNameAndSecondaryValue && (
        <text
          x={xScale(group.start.col) + groupNameOffset}
          y={group.start.row * cellHeight + groupNameOffset}
          textAnchor="start"
          dominantBaseline="hanging"
          fontSize="11"
          fill={getColors(group).textColor}
          opacity={opacity}
        >
          {group.name}
        </text>
      )}
    </React.Fragment>
  );
};
