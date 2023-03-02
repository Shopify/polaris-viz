import {animated, useSpring} from '@react-spring/web';
import {
  getColorVisionStylesForActiveIndex,
  usePrevious,
} from '@shopify/polaris-viz-core';

export function Area({
  activeIndex,
  fill,
  getAreaGenerator,
  hiddenIndexes,
  index,
  series,
  shouldAnimate,
}) {
  const areaD = getAreaGenerator(series);
  const previous = usePrevious(areaD);

  const spring = useSpring({
    from: {
      areaD: previous,
    },
    to: {
      areaD,
    },
    immediate: !shouldAnimate,
  });

  if (hiddenIndexes.includes(index)) {
    return null;
  }

  if (hiddenIndexes.includes(series.metadata?.relatedIndex)) {
    return null;
  }

  if (areaD == null) {
    return null;
  }

  return (
    <animated.path
      d={spring.areaD}
      fill={fill}
      fillOpacity={0.5}
      style={{
        ...getColorVisionStylesForActiveIndex({activeIndex, index}),
      }}
    />
  );
}
