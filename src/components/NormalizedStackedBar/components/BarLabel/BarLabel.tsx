import React from 'react';

import {LabelColor, Label, Container} from './BarLabel.style';

export interface Props {
  label: string;
  value: string;
  color: string;
}

export function BarLabel({label, value, color}: Props) {
  return (
    <Container>
      <LabelColor theme={{color}} />
      <Label>
        <strong>{label}</strong>
        <p>{value}</p>
      </Label>
    </Container>
  );
}
