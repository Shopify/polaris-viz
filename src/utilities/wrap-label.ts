import {getTextWidth} from './get-text-width';
import {breakString} from './break-string';

export function wrapLabel({
  label,
  maxWidth,
  fontSize,
}: {
  label: string;
  maxWidth: number;
  fontSize: number;
}) {
  const words = label.split(' ');
  const completedLines: string[] = [];
  let nextLine = '';

  words.forEach((word, index) => {
    const wordLength = getTextWidth({
      text: `${word} `,
      fontSize,
    });
    const nextLineLength = getTextWidth({text: nextLine, fontSize});

    if (wordLength > maxWidth) {
      const {hyphenatedStrings, remainingWord} = breakString({
        word,
        maxWidth,
        fontSize,
      });

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
