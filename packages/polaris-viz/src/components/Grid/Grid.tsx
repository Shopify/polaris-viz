import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {
  LabelFormatter,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  usePolarisVizContext,
  DEFAULT_CHART_PROPS,
  useChartPositions,
} from '@shopify/polaris-viz-core';
import {scaleLinear} from 'd3-scale';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {XAxis} from '../XAxis';
import {YAxis} from '../YAxis';
import {useResizeObserver} from '../../hooks/useResizeObserver';
import {ChartContainer} from '../ChartContainer';

import styles from './Grid.scss';

export interface GridProps {
  labelFormatter?: LabelFormatter;
  cellGroups: CellGroup[];
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  showGrid?: boolean;
}

interface CellGroup {
  start: {row: number; col: number};
  end: {row: number; col: number};
  bgColor: string;
  color: string;
  name: string;
  description: string;
  goal: string | null;
  connectedGroups?: string[];
  secondaryValue: string;
  value: string;
}

interface TooltipInfo {
  x: number;
  y: number;
  placement: 'left' | 'bottom' | 'top';
  groupName: string;
  groupDescription: string;
  groupGoal: string;
}

interface Point {
  x: number;
  y: number;
}

interface ChartPositions {
  chartXPosition: number;
  chartYPosition: number;
  drawableHeight: number;
  drawableWidth: number;
  xAxisBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  yAxisBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const TOOLTIP_WIDTH = 250;
// offset for the y axis label so that is not together with the y axis numbers
const Y_LABEL_OFFSET = 20;
// offset for the x axis label so that is not together with the x axis numbers
const X_LABEL_OFFSET = 40;
// offset for the arrows so that they overlap with the cells. We want the arrow to start 5px before the cell starts
const ARROW_OFFSET = 5;
const Y_AXIS_LABEL_WIDTH = 50;
const LOW_HIGH_LABEL_OFFSET = 60;

export function Grid(props: GridProps) {
  const {defaultTheme} = usePolarisVizContext();

  const [xAxisHeight, setXAxisHeight] = useState(40);
  const [hoveredGroups, setHoveredGroups] = useState<Set<string>>(new Set());
  const [hoveredGroup, setHoveredGroup] = useState<CellGroup | null>(null);
  const {setRef, entry} = useResizeObserver();
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [yAxisLabelMinWidth, setYAxisLabelWidth] = useState(0);
  const [xAxisLabelMinWidth, setXAxisLabelWidth] = useState(0);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [isSmallContainer, setIsSmallContainer] = useState(false);

  const {
    cellGroups = [],
    isAnimated,
    theme = defaultTheme,
    xAxisOptions = {},
    yAxisOptions = {},
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const dimensions = useMemo(
    () => ({
      width: entry?.contentRect.width ?? 300,
      height: entry?.contentRect.height ?? 200,
    }),
    [entry],
  );

  const gridDimensions = useMemo(() => {
    const maxRow = Math.max(...cellGroups.map((group) => group.end.row)) + 1;
    const maxCol = Math.max(...cellGroups.map((group) => group.end.col)) + 1;
    return {rows: maxRow, cols: maxCol};
  }, [cellGroups]);

  const fullChartWidth = dimensions.width - Y_AXIS_LABEL_WIDTH;
  const fullChartHeight = dimensions.height - xAxisHeight;

  const cellWidth = fullChartWidth / gridDimensions.cols;
  const cellHeight = fullChartHeight / gridDimensions.rows;

  const getActiveGroups = (group: CellGroup | null) => {
    if (!group) return new Set<string>();
    return new Set([group.name, ...(group.connectedGroups ?? [])]);
  };

  const getTooltipInfo = useCallback(
    (group: CellGroup, event: React.MouseEvent): TooltipInfo | null => {
      const rect = event.currentTarget.getBoundingClientRect();
      const containerRect = entry?.target?.getBoundingClientRect();

      if (!containerRect) return null;

      const leftSpace = rect.left - containerRect.left;
      const bottomSpace = containerRect.bottom - rect.bottom;

      let x;
      let y;
      let placement;
      if (leftSpace >= TOOLTIP_WIDTH) {
        // Position on the left
        x = rect.left - containerRect.left - TOOLTIP_WIDTH;
        y = rect.top - containerRect.top;
        placement = 'left';
      } else if (bottomSpace >= tooltipHeight) {
        // Position at the bottom
        x = rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
        y = rect.bottom - containerRect.top;
        placement = 'bottom';
      } else {
        // Position at the top
        x = rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
        y = rect.top - containerRect.top - tooltipHeight + 30;
        placement = 'top';
      }

      return {
        x,
        y,
        placement,
        groupName: group.name,
        groupDescription: group.description || '',
        groupGoal: group.goal || '',
      };
    },
    [entry, tooltipHeight],
  );

  const handleGroupHover = useCallback(
    (group: CellGroup | null, event: React.MouseEvent) => {
      if (!isSmallContainer) {
        if (group) {
          setHoveredGroups(getActiveGroups(group));
          setHoveredGroup(group);
          const tooltipInfo = getTooltipInfo(group, event);
          if (tooltipInfo) {
            setTooltipInfo(tooltipInfo);
            setIsTooltipVisible(true);
          }
        } else {
          setHoveredGroups(new Set());
          setHoveredGroup(null);
          setTooltipInfo(null);
          setIsTooltipVisible(false);
        }
      }
    },
    [getTooltipInfo, isSmallContainer],
  );

  const renderArrows = () => {
    if (!hoveredGroup) return null;

    const sourceGroup = cellGroups.find(
      (group) => group.name === hoveredGroup.name,
    );

    if (!sourceGroup || !sourceGroup.connectedGroups) return null;

    const getSharedEdgeCenter = (group1: CellGroup, group2: CellGroup) => {
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

    return sourceGroup.connectedGroups.map((targetGroupName) => {
      const targetGroup = cellGroups.find(
        (group) => group.name === targetGroupName,
      );
      if (!targetGroup) return null;

      // get the shared edge center between the source and target group
      const sharedEdgeInfo = getSharedEdgeCenter(sourceGroup, targetGroup);
      if (!sharedEdgeInfo) return null;

      const sourcePoint = {x: sharedEdgeInfo.x, y: sharedEdgeInfo.y};
      const arrowOffset = 25;

      let targetPoint: Point;
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

      const arrowHeadSize = Math.min(cellWidth, cellHeight) / 10;
      let arrowPoint1;
      let arrowPoint2;
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
          className={styles.animatedArrow}
          key={`arrow-${hoveredGroup?.name}-${sourceGroup.name}-${targetGroupName}`}
        >
          <path
            className={styles.arrowShaft}
            d={`M ${sourcePoint.x} ${sourcePoint.y} L ${targetPoint.x} ${targetPoint.y}`}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />

          <path
            className={styles.arrowHead}
            d={`M ${targetPoint.x} ${targetPoint.y + 0.5} L ${arrowPoint1.x} ${
              arrowPoint1.y
            } M ${targetPoint.x - 0.5} ${targetPoint.y} L ${arrowPoint2.x} ${
              arrowPoint2.y
            }`}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    });
  };

  const rawChartPositions = useChartPositions({
    height: Math.max(fullChartHeight, 1),
    width: Math.max(fullChartWidth, 1),
    xAxisHeight: Math.max(xAxisHeight, 0),
    yAxisWidth: Y_AXIS_LABEL_WIDTH,
    annotationsHeight: 0,
  });

  const chartPositions: ChartPositions = useMemo(() => {
    const yAxisTotalWidth = Y_AXIS_LABEL_WIDTH + Y_LABEL_OFFSET + 120;
    return {
      chartXPosition: rawChartPositions.chartXPosition ?? yAxisTotalWidth,
      chartYPosition: 0,
      drawableHeight: fullChartHeight,
      drawableWidth: fullChartWidth,
      xAxisBounds: {
        x: rawChartPositions.xAxisBounds?.x ?? yAxisTotalWidth,
        y: dimensions.height - xAxisHeight,
        width: fullChartWidth,
        height: xAxisHeight,
      },
      yAxisBounds: {
        x: 120,
        y: 0,
        width: Y_AXIS_LABEL_WIDTH,
        height: fullChartHeight,
      },
    };
  }, [
    rawChartPositions,
    dimensions,
    xAxisHeight,
    fullChartWidth,
    fullChartHeight,
  ]);

  const renderHeatmap = () => {
    return cellGroups.map((group, index) => {
      const groupWidth = (group.end.col - group.start.col + 1) * cellWidth;
      const groupHeight = (group.end.row - group.start.row + 1) * cellHeight;
      const groupValue = group.value;
      const groupSecondaryValue = group.secondaryValue;
      let opacity = 1;
      let cellOpacity = 1;

      const isMainActive = hoveredGroup?.name === group.name;
      const isActiveGroup = hoveredGroups.has(group.name);

      const isActive =
        hoveredGroups.size > 0 && (isMainActive || isActiveGroup);

      opacity = isActive || hoveredGroups.size === 0 ? 1 : 0.3;
      cellOpacity = isActive || hoveredGroups.size === 0 ? 1 : 0.3;

      const groupNameOffset = 10;
      const showNameAndSecondaryValue = dimensions.width >= 460;
      const mainFontSize = showNameAndSecondaryValue
        ? 20
        : Math.min(groupWidth, cellHeight) / 4;
      const secondaryFontSize = mainFontSize * 0.6;

      const animationDelay = animationStarted ? `${index * 50}ms` : '0ms';

      return (
        <g
          key={`group-${index}`}
          onMouseEnter={(event) => handleGroupHover(group, event)}
          onMouseLeave={(event) => handleGroupHover(null, event)}
          className={`${styles.animatedArrow} ${styles.groupCell}`}
          style={
            {
              '--animation-delay': animationDelay,
              '--animation-scale': animationStarted ? 1 : 0.5,
              '--animation-opacity': animationStarted ? 1 : 0,
            } as React.CSSProperties
          }
        >
          <rect
            x={xScale(group.start.col)}
            y={group.start.row * cellHeight}
            width={groupWidth}
            height={groupHeight}
            fill={getColors(group).bgColor}
            opacity={cellOpacity}
            stroke="white"
            strokeWidth="4"
            rx="4"
            ry="4"
          />

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
        </g>
      );
    });
  };

  const getColors = (group: CellGroup | null) => {
    if (group) {
      return {
        bgColor: group.bgColor,
        textColor: group.color,
      };
    }
    return {
      bgColor: 'blue',
      textColor: '#000000',
    };
  };

  const yTicks = useMemo(() => {
    return Array.from({length: gridDimensions.rows}, (_, index) => ({
      value: index,
      label: `${index + 1}`,
      formattedValue: `${index + 1}`,
      yOffset: index * cellHeight + cellHeight / 2,
    }));
  }, [cellHeight, gridDimensions.rows]);

  const xLabels = useMemo(
    () =>
      Array.from({length: gridDimensions.cols}, (_, index) => `${index + 1}`),
    [gridDimensions.cols],
  );

  const xAxisLabelWidth = fullChartWidth / xLabels.length;

  const xScale = useMemo(
    () =>
      scaleLinear().domain([0, gridDimensions.cols]).range([0, fullChartWidth]),
    [gridDimensions.cols, fullChartWidth],
  );

  const renderTooltip = () => {
    if (!tooltipInfo) return null;

    const {x, y, groupName, groupDescription, groupGoal} = tooltipInfo;
    const padding = 10;
    const transform = `translate(${x}, ${y})`;

    return (
      <g transform={transform}>
        <foreignObject x={0} y={0} width={TOOLTIP_WIDTH} height={tooltipHeight}>
          <div
            ref={(node) => {
              if (node) {
                const {height} = node.getBoundingClientRect();
                setTooltipHeight(height + padding * 2);
              }
            }}
            className={styles.Tooltip}
          >
            <div className={styles.TooltipTitle}>{groupName}</div>
            <div className={styles.TooltipDescription}>{groupDescription}</div>

            {groupGoal && (
              <div className={styles.TooltipGoal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  style={{height: '13px', width: '20px'}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>

                <p className={styles.GroupGoal}>{groupGoal}</p>
              </div>
            )}
          </div>
        </foreignObject>
      </g>
    );
  };

  useEffect(() => {
    // Trigger animation after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (entry?.contentRect) {
      setIsSmallContainer(entry.contentRect.width <= 400);
    }
  }, [entry]);

  const renderXAxisLabels = () => {
    const animationDelay = animationStarted ? '0.5s' : '0s';

    return (
      <React.Fragment>
        <XAxis
          allowLineWrap={false}
          labels={xLabels}
          labelWidth={xAxisLabelWidth}
          onHeightChange={setXAxisHeight}
          x={Y_AXIS_LABEL_WIDTH + Y_LABEL_OFFSET}
          y={chartPositions.xAxisBounds.y + Y_LABEL_OFFSET}
          xScale={xScale}
          ariaHidden
        />
        {!isSmallContainer && (
          <React.Fragment>
            <text
              x={dimensions.width + Y_LABEL_OFFSET}
              y={dimensions.height + xAxisHeight / 2}
              textAnchor="end"
              dominantBaseline="bottom"
              fontSize="12"
              fill="#B5B5B5"
              className={styles.fadeInLabel}
              style={{animationDelay}}
            >
              {xAxisOptionsWithDefaults.highLabel}
            </text>
          </React.Fragment>
        )}
        {xAxisOptionsWithDefaults.label && (
          <text
            ref={(node) => {
              if (!xAxisLabelMinWidth && node?.getBBox()?.width) {
                setXAxisLabelWidth(node?.getBBox()?.width);
              }
            }}
            x={
              (chartPositions.xAxisBounds.x +
                chartPositions.xAxisBounds.width) /
              2
            }
            y={dimensions.height + X_LABEL_OFFSET}
            fontSize="14"
            fill="#6b7177"
            textAnchor="middle"
            className={styles.fadeInLabel}
            style={{animationDelay}}
          >
            {xAxisOptionsWithDefaults.label}
          </text>
        )}
      </React.Fragment>
    );
  };

  const renderYAxisLabels = () => {
    const animationDelay = animationStarted ? '0.5s' : '0s';

    return (
      <React.Fragment>
        {yAxisOptionsWithDefaults.label && (
          <text
            ref={(node) => {
              if (!yAxisLabelMinWidth && node?.getBBox()?.width) {
                setYAxisLabelWidth(node?.getBBox()?.width);
              }
            }}
            x={chartPositions.yAxisBounds.x}
            y={chartPositions.yAxisBounds.x - Y_LABEL_OFFSET}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill="#6b7177"
            transform={`rotate(-90, ${chartPositions.yAxisBounds.x}, ${
              chartPositions.yAxisBounds.y +
              chartPositions.yAxisBounds.height / 2
            })`}
            className={styles.fadeInLabel}
            style={{animationDelay}}
          >
            {yAxisOptionsWithDefaults.label}
          </text>
        )}
        <YAxis
          ticks={yTicks}
          width={Y_AXIS_LABEL_WIDTH}
          textAlign="right"
          ariaHidden
          x={0}
          y={0}
        />
        {!isSmallContainer && (
          <React.Fragment>
            <text
              x={LOW_HIGH_LABEL_OFFSET}
              y={0}
              textAnchor="end"
              dominantBaseline="hanging"
              fontSize="12"
              fill="#B5B5B5"
              className={styles.fadeInLabel}
              style={{animationDelay}}
            >
              {xAxisOptionsWithDefaults.highLabel}
            </text>
            <text
              x={LOW_HIGH_LABEL_OFFSET}
              y={dimensions.height + xAxisHeight / 2}
              textAnchor="end"
              dominantBaseline="bottom"
              fontSize="12"
              fill="#B5B5B5"
              className={styles.fadeInLabel}
              style={{animationDelay}}
            >
              {xAxisOptionsWithDefaults.lowLabel}
            </text>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return (
    <ChartContainer id="grid" isAnimated={isAnimated} theme={theme}>
      <div id="container" ref={setRef} className={styles.container}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {/* Y-Axis */}
          <g opacity={yAxisOptionsWithDefaults?.hide ? 0 : 1}>
            {renderYAxisLabels()}
          </g>

          {/* Main chart content */}
          <g transform={`translate(${Y_AXIS_LABEL_WIDTH + Y_LABEL_OFFSET}, 0)`}>
            {renderHeatmap()}
            {!isSmallContainer && renderArrows()}
          </g>

          {/* X-Axis */}
          <g opacity={xAxisOptionsWithDefaults?.hide ? 0 : 1}>
            {renderXAxisLabels()}
          </g>

          {!isSmallContainer && isTooltipVisible && renderTooltip()}
        </svg>
      </div>
    </ChartContainer>
  );
}

Grid.displayName = 'Grid';
