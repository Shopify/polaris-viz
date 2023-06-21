import type {CSSProperties} from 'react';
import type {LegendPosition} from 'types';

const styleMap: {[key: string]: CSSProperties} = {
  top: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  'top-left': {
    flexDirection: 'row-reverse',
    alignItems: 'start',
  },
  'top-right': {
    flexDirection: 'row',
    alignItems: 'start',
  },
  'bottom-right': {
    flexDirection: 'row',
    alignItems: 'end',
  },
  'bottom-left': {
    flexDirection: 'row-reverse',
    alignItems: 'end',
  },
  'top-left-column': {
    flexDirection: 'column-reverse',
    alignItems: 'start',
  },
  'top-right-column': {
    flexDirection: 'column-reverse',
    alignItems: 'end',
  },
  'bottom-right-column': {
    flexDirection: 'column',
    alignItems: 'end',
  },
  'bottom-left-column': {
    flexDirection: 'column',
    alignItems: 'start',
  },
};

export function getContainerAlignmentForLegend(
  position: LegendPosition,
  alignCornersWithinColumn = false,
) {
  const isCornerPosition = position.includes('-');

  const styleKey =
    alignCornersWithinColumn && isCornerPosition
      ? `${position}-column`
      : position;

  return styleMap[styleKey];
}
