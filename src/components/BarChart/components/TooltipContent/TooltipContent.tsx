import React from 'react';

import styles from './TooltipContent.scss';

export interface TooltipContentProps {
  label: string;
  value: string;
  isMedian?: boolean;
}

export function TooltipContent({label, value, isMedian}: TooltipContentProps) {
  console.log({isMedian});
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        columnGap: '10px',
        fontSize: '10px',
        rowGap: '8px',
      }}
    >
      {isMedian && (
        <React.Fragment>
          <span style={{color: '#8F68FF'}}>Median</span>
          <strong style={{fontWeight: '400'}}>3.5 hours</strong>
        </React.Fragment>
      )}
      <span style={{color: '#6D7175'}}>Orders fulfilled</span>
      <strong style={{fontWeight: '400'}}>{value}</strong>
    </div>
  );
}
