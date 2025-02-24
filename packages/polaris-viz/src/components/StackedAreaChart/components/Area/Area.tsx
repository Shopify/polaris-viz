import {
  LinearGradientWithStops,
  getColorVisionEventAttrs,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
  getGradientFromColor,
} from '@shopify/polaris-viz-core';
import type {GradientStop} from '@shopify/polaris-viz-core';

import styles from './Area.scss';
import type {AreaProps} from './types';

export function Area({
  activeLineIndex,
  areaGenerator,
  colors,
  data,
  id,
  index,
  lineGenerator,
  selectedTheme,
  tooltipAreas,
}: AreaProps) {
  const opacity = 0.25;
  const areaShape = areaGenerator(data);
  const lineShape = lineGenerator(data);

  if (areaShape == null || lineShape == null) {
    return null;
  }

  const gradient = getGradientFromColor(colors[index]);
  const areaMarkup = (
    <path
      key={index}
      style={{opacity}}
      d={areaShape}
      fill={`url(#area-${id}-${index})`}
    />
  );

  return (
    <g
      {...getColorVisionEventAttrs({
        type: COLOR_VISION_SINGLE_ITEM,
        index,
      })}
      tabIndex={-1}
    >
      <defs>
        <LinearGradientWithStops
          id={`area-${id}-${index}`}
          gradient={gradient as GradientStop[]}
          gradientUnits="userSpaceOnUse"
          y1="100%"
          y2="0%"
        />
        <clipPath id={`clip-${id}-${index}`}>{areaMarkup}</clipPath>
      </defs>
      <g
        style={getColorVisionStylesForActiveIndex({
          activeIndex: activeLineIndex,
          index,
        })}
        aria-hidden="true"
        tabIndex={-1}
        className={styles.Group}
      >
        <path
          key={`line-${index}`}
          d={lineShape}
          fill="none"
          stroke={`url(#area-${id}-${index})`}
          strokeWidth={selectedTheme.line.width}
        />
        <g clipPath={`url(#clip-${id}-${index})`}>
          {areaMarkup}
          {tooltipAreas}
        </g>
      </g>
    </g>
  );
}
