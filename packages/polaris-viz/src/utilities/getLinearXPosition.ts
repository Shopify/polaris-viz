import type {ScaleLinear} from 'd3-scale';
import type {AnimatedCoordinate} from 'types';

interface GetLinearYPositionProps {
  activePointIndex: number;
  animatedCoordinates: AnimatedCoordinate;
  index: number;
  offset: number;
  xScale: ScaleLinear<number, number>;
}

export function getLinearXPosition({
  activePointIndex,
  animatedCoordinates,
  index,
  offset,
  xScale,
}: GetLinearYPositionProps) {
  if (xScale == null) {
    return 0;
  }

  if (
    index !== null &&
    animatedCoordinates != null &&
    activePointIndex != null &&
    animatedCoordinates[index]
  ) {
    return animatedCoordinates[index].to((coord) => coord.x - offset);
  }

  return xScale(index == null ? 0 : index) - offset;
}
