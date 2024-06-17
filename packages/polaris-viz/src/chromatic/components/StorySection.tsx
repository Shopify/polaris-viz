import type {ReactNode} from 'react';

export function StorySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p style={{color: 'black'}}>
        <strong>{title}</strong>
      </p>
      <div style={{display: 'grid', gap: '10px'}}>{children}</div>
    </div>
  );
}
