import styled from '@emotion/styled';

interface Props {
  scale: number;
  height: number;
  width: number;
  background: string;
}

export const Segment = styled.div((props: Props) => ({
  background: props.background,
  border: '1px solid transparent',
  flex: `${props.scale} 0 0`,
  width: `${props.width}px`,
  height: `${props.height}px`,
  margin: '0 1px 1px 0',
  '&:last-of-type': {margin: 0},
}));
