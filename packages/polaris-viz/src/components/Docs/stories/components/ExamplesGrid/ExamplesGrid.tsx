import type {ReactNode} from 'react';

export function ExamplesGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: `repeat(${cols}, minmax(250px, 1fr))`,
        gridTemplateRows: '1fr',
      }}
    >
      {children}
    </div>
  );
}
