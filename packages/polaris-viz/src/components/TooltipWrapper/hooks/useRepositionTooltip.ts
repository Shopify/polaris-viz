import type {
  BoundingRect,
  Dimensions,
  Position,
} from '@shopify/polaris-viz-core';
import {
  InternalChartType,
  clamp,
  useChartContext,
} from '@shopify/polaris-viz-core';
import {useCallback} from 'react';

const SCROLLBAR_SIZE = 20;
const TOOLTIP_SPACING = 20;

export function useRepositionTooltip() {
  const {
    containerBounds,
    isPerformanceImpacted,
    scrollContainer,
    isTouchDevice,
  } = useChartContext();

  return useCallback(
    ({
      chartType,
      seriesBounds,
      tooltipDimensions,
      x,
      y,
    }: {
      chartType: InternalChartType;
      seriesBounds: BoundingRect | null;
      tooltipDimensions: Dimensions | null;
      x: number;
      y: number;
    }) => {
      if (
        tooltipDimensions == null ||
        tooltipDimensions.width === 0 ||
        tooltipDimensions.height === 0
      ) {
        return {x, y};
      }

      let newX = x;
      let newY = y;

      if (isPerformanceImpacted) {
        newY = containerBounds.y;
      }

      if (isTouchDevice) {
        newY = containerBounds.y - tooltipDimensions.height;
      }

      // Reposition the tooltip for different chart types.
      // Example: BarChart renders the tooltip centered and above
      // the data series.
      switch (chartType) {
        case InternalChartType.Bar:
          newY -= tooltipDimensions.height + TOOLTIP_SPACING;
          newX -= tooltipDimensions.width / 2;
          break;
        case InternalChartType.HorizontalBar:
          newX += TOOLTIP_SPACING;
          newY -= tooltipDimensions.height / 2;
          break;
        default:
          newY -= tooltipDimensions.height / 2;
          newX += TOOLTIP_SPACING;
          break;
      }

      // Once the tooltip is positioned, we need to ensure that
      // it's not rendering outside the browser window,
      // or covering any data series.
      return findOptimalPosition({
        chartType,
        scrollContainer,
        seriesBounds,
        tooltipDimensions,
        x: newX,
        y: newY,
      });
    },
    [containerBounds, isPerformanceImpacted, scrollContainer, isTouchDevice],
  );
}

function findOptimalPosition({
  chartType,
  scrollContainer,
  seriesBounds,
  tooltipDimensions,
  x,
  y,
}: {
  chartType: InternalChartType;
  scrollContainer?: Element | null;
  seriesBounds: BoundingRect | null;
  tooltipDimensions: Dimensions;
  x: number;
  y: number;
}): Position {
  if (
    isPositionWithinWindowAndOutsideSeriesBounds({
      scrollContainer,
      seriesBounds,
      tooltipDimensions,
      x,
      y,
    })
  ) {
    return {x, y};
  }

  // Check if position would be outside window bounds
  const tooltipBounds = {
    top: y,
    left: x,
    bottom: y + tooltipDimensions.height,
    right: x + tooltipDimensions.width,
  };

  const isOutsideWindow = !isWithinWindowBounds({
    ...tooltipBounds,
    scrollContainer,
  });

  const {containerWidth, containerHeight} =
    getScrollContainerBounds(scrollContainer);

  const containerMax =
    containerWidth - tooltipDimensions.width - SCROLLBAR_SIZE;
  let newX = x;

  // If the tooltip has been repositioned where it would render
  // outside the browser window, or cover the data series,
  // we want to reposition it again around the series bounds.
  if (isOutsideWindow && seriesBounds != null) {
    const positions: Position[] = [
      getValidBottomPositionForChartType({
        seriesBounds,
        tooltipDimensions,
      }),
      getValidTopPositionForChartType({
        chartType,
        seriesBounds,
        tooltipDimensions,
      }),
      getValidLeftPositionForChartType({seriesBounds, tooltipDimensions}),
      getValidRightPositionForChartType({seriesBounds}),
    ];

    const validPosition = positions.find((pos) =>
      isPositionWithinWindowAndOutsideSeriesBounds({
        ...pos,
        scrollContainer,
        seriesBounds,
        tooltipDimensions,
      }),
    );

    if (validPosition) {
      return {...validPosition};
    }
  }

  if (seriesBounds == null) {
    // We can assume if there's no series bounds,
    // the tooltip is following the cursor.
    // Don't let the tooltip cover the cursor.
    if (x + tooltipDimensions.width > containerMax) {
      newX -= tooltipDimensions.width + SCROLLBAR_SIZE + TOOLTIP_SPACING;
    }
  }

  // Finally keep the tooltip within the bounds.
  return {
    x: clamp({
      amount: newX,
      min: TOOLTIP_SPACING,
      max: containerMax,
    }),
    y: clamp({
      amount: y,
      min: TOOLTIP_SPACING,
      max: containerHeight - tooltipDimensions.height - SCROLLBAR_SIZE,
    }),
  };
}

function getValidTopPositionForChartType({
  chartType,
  tooltipDimensions,
  seriesBounds,
}: {
  chartType: InternalChartType;
  tooltipDimensions: Dimensions;
  seriesBounds: BoundingRect;
}): Position {
  switch (chartType) {
    // Place the tooltip above and to the right of the series bounds
    case InternalChartType.HorizontalBar: {
      return {
        x: seriesBounds.x + seriesBounds.width - tooltipDimensions.width,
        y: seriesBounds.y - tooltipDimensions.height,
      };
    }
    // Center the tooltip above the series bounds
    default:
      return {
        x: seriesBounds.x + (seriesBounds.width - tooltipDimensions.width) / 2,
        y: seriesBounds.y - tooltipDimensions.height,
      };
  }
}

function getValidBottomPositionForChartType({
  seriesBounds,
  tooltipDimensions,
}: {
  seriesBounds: BoundingRect;
  tooltipDimensions: Dimensions;
}): Position {
  return {
    x: seriesBounds.x - tooltipDimensions.width,
    y: TOOLTIP_SPACING,
  };
}

function getValidLeftPositionForChartType({
  seriesBounds,
  tooltipDimensions,
}: {
  seriesBounds: BoundingRect;
  tooltipDimensions: Dimensions;
}): Position {
  return {
    x: seriesBounds.x - tooltipDimensions.width,
    y: seriesBounds.y,
  };
}

function getValidRightPositionForChartType({
  seriesBounds,
}: {
  seriesBounds: BoundingRect;
}): Position {
  return {
    x: seriesBounds.x + seriesBounds.width,
    y: seriesBounds.y,
  };
}

function isPositionWithinWindowAndOutsideSeriesBounds({
  scrollContainer,
  seriesBounds,
  tooltipDimensions,
  x,
  y,
}: {
  scrollContainer?: Element | null;
  seriesBounds: BoundingRect | null;
  tooltipDimensions: Dimensions;
  x: number;
  y: number;
}): boolean {
  const tooltipBounds = {
    top: y,
    left: x,
    bottom: y + tooltipDimensions.height,
    right: x + tooltipDimensions.width,
  };

  const isWithinWindow = isWithinWindowBounds({
    ...tooltipBounds,
    scrollContainer,
  });

  // If no safe area, just check window bounds
  if (seriesBounds == null) {
    return isWithinWindow;
  }

  // Check if overlapping the data series
  const isOverlappingSeriesBounds =
    tooltipBounds.right > seriesBounds.x &&
    tooltipBounds.left < seriesBounds.x + seriesBounds.width &&
    tooltipBounds.bottom > seriesBounds.y &&
    tooltipBounds.top < seriesBounds.y + seriesBounds.height;

  return isWithinWindow && !isOverlappingSeriesBounds;
}

function isWithinWindowBounds({
  top,
  left,
  right,
  bottom,
  scrollContainer,
}: {
  top: number;
  left: number;
  right: number;
  bottom: number;
  scrollContainer?: Element | null;
}): boolean {
  const {containerWidth, containerHeight} =
    getScrollContainerBounds(scrollContainer);

  return (
    top >= 0 &&
    left >= 0 &&
    right <= containerWidth &&
    bottom <= containerHeight
  );
}

function getScrollContainerBounds(scrollContainer?: Element | null) {
  if (scrollContainer == null) {
    return {
      scrollX: 0,
      scrollY: 0,
      containerWidth: window.innerWidth + window.scrollX,
      containerHeight: window.innerHeight + window.scrollY,
    };
  }

  return {
    scrollX: 0,
    scrollY: 0,
    containerWidth: scrollContainer.clientWidth + scrollContainer.scrollLeft,
    containerHeight: scrollContainer.clientHeight + scrollContainer.scrollTop,
  };
}
