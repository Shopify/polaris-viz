export function getTextWidth({
  text,
  fontSize,
}: {
  text: string;
  fontSize: number;
}) {
  const paragraph = document.createElement('p');
  paragraph.style.fontSize = fontSize.toString();
  paragraph.style.display = 'inline-block';
  paragraph.style.visibility = 'hidden';
  document.body.appendChild(paragraph);
  paragraph.innerText = text;
  const width = paragraph.clientWidth;

  document.body.removeChild(paragraph);

  return width;
}
