import {getTextWidth} from './get-text-width';
import {breakString} from './break-string';

export function wrapLabel(label: string, maxWidth: number) {
  const words = label.split(' ');
  const completedLines: string[] = [];
  let nextLine = '';

  words.forEach((word, index) => {
    const wordLength = getTextWidth(`${word} `);
    const nextLineLength = getTextWidth(nextLine);

    if (wordLength > maxWidth) {
      const {hyphenatedStrings, remainingWord} = breakString(word, maxWidth);

      completedLines.push(nextLine, ...hyphenatedStrings);
      nextLine = remainingWord;
    } else if (nextLineLength + wordLength >= maxWidth) {
      completedLines.push(nextLine);
      nextLine = word;
    } else {
      nextLine = [nextLine, word].filter(Boolean).join(' ');
    }

    const currentWord = index + 1;
    const isLastWord = currentWord === words.length;

    if (isLastWord) {
      completedLines.push(nextLine);
    }
  });

  return completedLines.filter((line) => line !== '');
}
