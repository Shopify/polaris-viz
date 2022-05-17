import {
  Color,
  DataSeries,
  getColorFromGradient,
  GradientStop,
  isGradientType,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import {useMemo} from 'react';

import type {Annotation, AnnotationLookupTable} from '../../../types';
import type {AnnotationsWithData} from '../types';

import {useAnnotationPositions} from './useAnnotationPositions';

interface Props {
  annotationsHeight: number;
  annotationsLookupTable: AnnotationLookupTable;
  barWidth: number;
  colors: Color[];
  data: DataSeries[];
  drawableHeight: number;
  drawableWidth: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  theme?: string;
}

export function useAnnotations({
  annotationsHeight,
  annotationsLookupTable,
  barWidth,
  colors,
  data,
  drawableHeight,
  drawableWidth,
  theme,
  xScale,
  yScale,
}: Props) {
  const selectedTheme = useTheme(theme);

  const seriesCount = data.length;
  const hasEvenSeriesCount = seriesCount % 2 === 0;

  const annotations = useMemo(() => {
    return Object.keys(annotationsLookupTable)
      .map((key) => {
        const numberedKey = Number(key);

        const annotation = annotationsLookupTable[
          numberedKey
        ] as AnnotationsWithData;

        if (annotation == null) {
          return null;
        }

        return annotation;
      })
      .filter(Boolean) as Annotation[];
  }, [annotationsLookupTable]);

  const positions = useAnnotationPositions({
    annotations,
    barWidth,
    drawableWidth,
    xScale,
  });

  const annotationsWithData = annotations.map((annotation, index) => {
    const annotationsWithData: AnnotationsWithData = {
      ...annotation,
      line: {
        color: selectedTheme.annotations.backgroundColor,
        height: annotationsHeight + yScale(0),
        x: positions[index].lineX,
        y: positions[index].y,
      },
      position: positions[index],
    };

    if (!hasEvenSeriesCount) {
      const seriesIndex = Math.round(seriesCount / 2) - 1;

      const {value} = data[seriesIndex].data[annotation.startIndex];
      const height = yScale(value ?? 0);

      const barHeight = drawableHeight - height;

      const percentage = barHeight / drawableHeight;
      const color = isGradientType(colors[seriesIndex])
        ? getColorFromGradient(
            colors[seriesIndex] as GradientStop[],
            percentage,
          )
        : colors[seriesIndex];

      annotationsWithData.line.height = annotationsHeight + height;
      annotationsWithData.line.color = color;
    }

    return annotationsWithData;
  });

  return {annotations: annotationsWithData, positions};
}
