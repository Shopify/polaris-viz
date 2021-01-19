export function getTextWidth({
  text,
  fontSize,
}: {
  text: string;
  fontSize: number;
}) {
  const paragraph = document.createElement('p');
  paragraph.style.fontSize = `${fontSize}px`;
  paragraph.style.display = 'inline-block';
  paragraph.style.visibility = 'hidden';
  document.body.appendChild(paragraph);
  paragraph.innerText = text;
  const width = paragraph.clientWidth;

  document.body.removeChild(paragraph);

  return width;
}

export function getTextContainerHeight({
  text,
  fontSize,
  containerWidth,
}: {
  text: string;
  fontSize: number;
  containerWidth: number;
}) {
  const paragraph = document.createElement('p');
  const container = document.createElement('div');
  paragraph.style.fontSize = `${fontSize}px`;
  paragraph.style.display = 'inline-block';
  paragraph.style.visibility = 'hidden';
  // paragraph.style.marginBottom = '0px';
  container.style.width = `${containerWidth}px`;
  document.body.appendChild(container);
  container.appendChild(paragraph);
  paragraph.innerText = text;
  const height = container.clientHeight;

  document.body.removeChild(container);

  return height;
}
