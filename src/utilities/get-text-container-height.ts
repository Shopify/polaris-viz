import {LINE_HEIGHT} from '../constants';

export function getTextContainerHeight({
  text,
  fontSize,
  containerWidth,
}: {
  text: string;
  fontSize: number;
  containerWidth: number;
}) {
  const container = document.createElement('div');
  container.style.fontSize = `${fontSize}px`;
  container.style.display = 'inline-block';
  container.style.visibility = 'hidden';
  container.style.width = `${containerWidth}px`;
  container.style.wordBreak = 'break-word';
  container.style.lineHeight = `${LINE_HEIGHT}`;
  document.body.appendChild(container);
  container.innerText = text;
  const height = container.clientHeight;

  document.body.removeChild(container);

  return height;
}
