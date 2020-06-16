import {getTextWidth} from './get-text-width';

export function breakString({
  word,
  maxWidth,
  fontSize,
}: {
  word: string;
  maxWidth: number;
  fontSize: number;
}) {
  const characters = word.split('');
  const lines: string[] = [];
  let currentLine = '';

  characters.forEach((character) => {
    const nextLine = `${currentLine}${character}`;
    const lineWidth = getTextWidth({text: nextLine, fontSize: fontSize});

    if (lineWidth >= maxWidth) {
      lines.push(nextLine);
      currentLine = '';
    } else {
      currentLine = nextLine;
    }
  });

  return {hyphenatedStrings: lines, remainingWord: currentLine};
}
