import React, {useEffect, useState} from 'react';
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
  const [isFadingIn, setIsFadingIn] = useState(true);

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
    isAnimated && animationStarted && isFadingIn ? `${index * 50}ms` : '0ms';

  const groupX = xScale(group.start.col);
  const groupY = group.start.row * cellHeight;

  const cellStyle = isAnimated
    ? {
        '--animation-delay': animationDelay,
        '--animation-scale': animationStarted ? 1 : 0,
        '--animation-opacity': animationStarted ? 1 : 0,
        transformOrigin: `${groupX + groupWidth / 2}px ${
          groupY + groupHeight / 2
        }px`,
      }
    : {
        opacity: 1,
        transform: 'scale(1)',
      };

  useEffect(() => {
    if (isAnimated && animationStarted) {
      const timer = setTimeout(() => {
        setIsFadingIn(false);
      }, parseInt(animationDelay, 10) + 500);

      return () => clearTimeout(timer);
    }
  }, [isAnimated, animationStarted, animationDelay]);

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
        isAnimated
          ? `${styles.AnimatedArrow} ${styles.GroupCell} ${
              isFadingIn ? styles.FadeIn : ''
            }`
          : undefined
      }
      style={{...cellStyle, opacity: cellOpacity}}
    >
      <Background
        x={groupX}
        y={groupY}
        width={groupWidth}
        height={groupHeight}
        fill={getColors(group).bgColor}
        opacity={cellOpacity}
      />

      <GroupInfo
        {...{
          groupX,
          groupY,
          group,
          groupWidth,
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
    stroke="white"
    strokeWidth="4"
    rx="4"
    ry="4"
    opacity={opacity}
  />
);

interface GroupInfoProps {
  groupX: number;
  groupY: number;
  group: {
    name: string;
  };
  groupWidth: number;
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
  groupX,
  groupY,
  group,
  groupWidth,
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
        x={groupX + groupWidth / 2}
        y={groupY + groupHeight / 2}
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
          x={groupX + groupNameOffset}
          y={groupY + groupNameOffset}
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
