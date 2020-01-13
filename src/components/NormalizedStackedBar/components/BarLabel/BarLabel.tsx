import React from 'react';

import {LabelColor, Label, Container, Value} from './BarLabel.style';

export interface Props {
  label: string;
  value: string;
  color: string;
}

export function BarLabel({label, value, color}: Props) {
  return (
    <Container>
      <LabelColor color={color} />
      <Label>
        <strong>{label}</strong>
        <Value>{value}</Value>
      </Label>
    </Container>
  );
}
