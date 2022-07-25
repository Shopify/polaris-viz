import React, {ReactNode} from 'react';

export function StorySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p>
        <strong>{title}</strong>
      </p>
      <div style={{display: 'grid', gap: '10px'}}>{children}</div>
    </div>
  );
}
