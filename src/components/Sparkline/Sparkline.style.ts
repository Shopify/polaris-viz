import styled from '@emotion/styled';
import {PositionProperty} from 'csstype';

export const VisiblyHidden = styled.span(() => ({
  // Importants are required to ensure component is available to screenreaders as expected
  position: 'absolute !important' as PositionProperty,
  top: 0,
  clip: 'rect(1px, 1px, 1px, 1px) !important',
  overflow: 'hidden !important',
  height: '1px !important',
  width: ' 1px !important',
  padding: ' 0 !important',
  border: '0 !important',
}));
