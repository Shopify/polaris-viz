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
