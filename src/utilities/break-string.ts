import {getTextWidth} from './get-text-width';

export function breakString(word: string, maxWidth: number) {
  const characters = word.split('');
  const lines: string[] = [];
  let currentLine = '';

  characters.forEach((character, index) => {
    const nextLine = `${currentLine}${character}`;
    const lineWidth = getTextWidth(nextLine);

    if (lineWidth >= maxWidth) {
      const currentCharacter = index + 1;
      const isLastLine = characters.length === currentCharacter;
      const hyphenatedNextLine = `${nextLine}-`;

      lines.push(isLastLine ? nextLine : hyphenatedNextLine);
      currentLine = '';
    } else {
      currentLine = nextLine;
    }
  });

  return {hyphenatedStrings: lines, remainingWord: currentLine};
}
