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

  container.style.cssText = `font-size: ${fontSize}px;
  width: ${containerWidth}px;
  display: 'inline-block';
  word-break: break-word;
  line-height: 1;
  font-feature-settings: 'tnum';
  visibility: hidden;`;

  document.body.appendChild(container);
  container.innerText = text;
  const height = container.clientHeight;
  document.body.removeChild(container);
  return height;
}
