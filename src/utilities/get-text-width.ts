export function getTextWidth(text: string) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const tick = document.createElement('p');
  tick.style.fontSize = '12px';
  tick.style.display = 'inline-block';
  tick.style.visibility = 'hidden';
  document.body.appendChild(tick);
  tick.innerText = text;
  const width = tick.clientWidth;

  document.body.removeChild(tick);

  return width;
}
