import type {AnnotationPosition} from '../types';

interface Props {
  positions: AnnotationPosition[];
  totalRows: number;
}

export function checkForHorizontalSpace({positions, totalRows}: Props) {
  let checkAgain = false;

  [...Array.from({length: totalRows})].forEach((_, rowIndex) => {
    const currentRow = rowIndex + 1;
    positions
      .filter(({row}) => row === currentRow)
      .forEach((current, index, filtered) => {
        const nextRow = currentRow + 1;

        const next = filtered[index + 1];

        if (next == null) {
          return;
        }

        const left = current.x;
        const right = current.x + current.width;

        if (current.row === next.row && next.x > left && next.x < right) {
          next.row = nextRow;

          checkAgain = true;
        }
      });
  });

  if (checkAgain) {
    checkForHorizontalSpace({positions, totalRows: totalRows + 1});
  }
}
