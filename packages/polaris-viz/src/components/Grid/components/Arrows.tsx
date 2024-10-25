import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import styles from '../Grid.scss';

interface ArrowsProps {
  hoveredGroup: CellGroup | null;
  cellGroups: CellGroup[];
  xScale: ScaleLinear<number, number>;
  cellHeight: number;
}

interface CellGroup {
  name: string;
  start: {row: number; col: number};
  end: {row: number; col: number};
  connectedGroups?: string[];
}

type Placement = 'left' | 'bottom' | 'top' | 'right';

const ARROW_OFFSET = 10;

export function Arrows({
  hoveredGroup,
  cellGroups,
  xScale,
  cellHeight,
}: ArrowsProps) {
  if (!hoveredGroup) return null;

  const sourceGroup = cellGroups.find(
    (group) => group.name === hoveredGroup.name,
  );

  if (!sourceGroup || !sourceGroup.connectedGroups) return null;

  const getSharedEdgeCenter = (
    group1: CellGroup,
    group2: CellGroup,
  ): {
    x: number;
    y: number;
    sourceEdge: Placement;
    targetEdge: Placement;
  } | null => {
    if (group1.end.row < group2.start.row) {
      // group1 is above group2
      const startX = Math.max(
        xScale(group1.start.col),
        xScale(group2.start.col),
      );
      const endX = Math.min(
        xScale(group1.end.col + 1),
        xScale(group2.end.col + 1),
      );
      return {
        x: (startX + endX) / 2,
        y: (group1.end.row + 1) * cellHeight,
        sourceEdge: 'bottom',
        targetEdge: 'top',
      };
    }
    if (group1.start.row > group2.end.row) {
      // group1 is below group2
      const startX = Math.max(
        xScale(group1.start.col),
        xScale(group2.start.col),
      );
      const endX = Math.min(
        xScale(group1.end.col + 1),
        xScale(group2.end.col + 1),
      );
      return {
        x: (startX + endX) / 2,
        y: group1.start.row * cellHeight + ARROW_OFFSET,
        sourceEdge: 'top',
        targetEdge: 'bottom',
      };
    }
    if (group1.end.col < group2.start.col) {
      // group1 is to the left of group2
      const startY = Math.max(
        group1.start.row * cellHeight,
        group2.start.row * cellHeight,
      );
      const endY = Math.min(
        (group1.end.row + 1) * cellHeight,
        (group2.end.row + 1) * cellHeight,
      );
      return {
        x: xScale(group1.end.col + 1) - ARROW_OFFSET,
        y: (startY + endY) / 2,
        sourceEdge: 'right',
        targetEdge: 'left',
      };
    }
    if (group1.start.col > group2.end.col) {
      // group1 is to the right of group2
      const startY = Math.max(
        group1.start.row * cellHeight,
        group2.start.row * cellHeight,
      );
      const endY = Math.min(
        (group1.end.row + 1) * cellHeight,
        (group2.end.row + 1) * cellHeight,
      );
      return {
        x: xScale(group1.start.col),
        y: (startY + endY) / 2,
        sourceEdge: 'left',
        targetEdge: 'right',
      };
    }
    return null;
  };

  return (
    <React.Fragment>
      {sourceGroup.connectedGroups.map((targetGroupName) => {
        const targetGroup = cellGroups.find(
          (group) => group.name === targetGroupName,
        );
        if (!targetGroup) return null;

        const sharedEdgeInfo = getSharedEdgeCenter(sourceGroup, targetGroup);
        if (!sharedEdgeInfo) return null;

        const sourcePoint = {x: sharedEdgeInfo.x, y: sharedEdgeInfo.y};
        const arrowOffset = 25;

        let targetPoint: {x: number; y: number};
        if (
          sharedEdgeInfo.sourceEdge === 'top' ||
          sharedEdgeInfo.sourceEdge === 'bottom'
        ) {
          targetPoint = {
            x: sourcePoint.x,
            y:
              sharedEdgeInfo.sourceEdge === 'bottom'
                ? sourcePoint.y + arrowOffset
                : sourcePoint.y - arrowOffset,
          };
        } else {
          targetPoint = {
            x:
              sharedEdgeInfo.sourceEdge === 'right'
                ? sourcePoint.x + arrowOffset
                : sourcePoint.x - arrowOffset,
            y: sourcePoint.y,
          };
        }

        const arrowHeadSize = Math.min(xScale(1) - xScale(0), cellHeight) / 10;
        let arrowPoint1: {x: number; y: number};
        let arrowPoint2: {x: number; y: number};
        if (
          sharedEdgeInfo.sourceEdge === 'top' ||
          sharedEdgeInfo.sourceEdge === 'bottom'
        ) {
          const direction = sharedEdgeInfo.sourceEdge === 'bottom' ? 1 : -1;
          arrowPoint1 = {
            x: targetPoint.x - arrowHeadSize,
            y: targetPoint.y - direction * arrowHeadSize,
          };
          arrowPoint2 = {
            x: targetPoint.x + arrowHeadSize,
            y: targetPoint.y - direction * arrowHeadSize,
          };
        } else {
          const direction = sharedEdgeInfo.sourceEdge === 'right' ? 1 : -1;
          arrowPoint1 = {
            x: targetPoint.x - direction * arrowHeadSize,
            y: targetPoint.y - arrowHeadSize,
          };
          arrowPoint2 = {
            x: targetPoint.x - direction * arrowHeadSize,
            y: targetPoint.y + arrowHeadSize,
          };
        }

        return (
          <g
            key={`arrow-${hoveredGroup?.name}-${sourceGroup.name}-${targetGroupName}`}
          >
            <path
              className={styles.ArrowShaft}
              d={`M ${sourcePoint.x} ${sourcePoint.y} Q ${
                (sourcePoint.x + targetPoint.x) / 2
              } ${(sourcePoint.y + targetPoint.y) / 2} ${targetPoint.x} ${
                targetPoint.y
              }`}
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <path
              className={styles.ArrowHead}
              d={`M ${targetPoint.x} ${targetPoint.y - 0} L ${arrowPoint1.x} ${
                arrowPoint1.y
              } M ${targetPoint.x} ${targetPoint.y - 0} L ${arrowPoint2.x} ${
                arrowPoint2.y
              }`}
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
