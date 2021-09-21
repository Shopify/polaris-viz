export function getTextWidth({
  text,
  fontSize,
}: {
  text: string;
  fontSize: number;
}) {
  const paragraph = document.createElement('p');

  paragraph.style.cssText = `font-size: ${fontSize}px;
  display: inline-block;
  font-feature-settings: 'tnum';
  visibility: hidden`;

  document.body.appendChild(paragraph);
  paragraph.innerText = text;
  const width = paragraph.clientWidth;
  document.body.removeChild(paragraph);
  return width;
}

export function getTextHeight({
  text,
  fontSize,
  containerWidth,
}: {
  text: string;
  fontSize: number;
  containerWidth: number;
}) {
  const paragraph = document.createElement('p');
  paragraph.style.cssText = `font-size: ${fontSize}px;
  display: inline-block;
  font-feature-settings: 'tnum';
  visibility: hidden;
  width: ${containerWidth}px`;

  document.body.appendChild(paragraph);
  paragraph.innerText = text;

  const height = paragraph.clientHeight;
  document.body.removeChild(paragraph);
  return height;
}
