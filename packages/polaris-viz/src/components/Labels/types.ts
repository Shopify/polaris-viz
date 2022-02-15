export interface PreparedLabels {
  text: string;
  words: {word: string; wordWidth: number}[];
  truncatedWords: string[];
  truncatedName: string;
  truncatedWidth: number;
}

export interface FormattedLine {
  height: number;
  truncatedText: string;
  fullText: string;
  textAnchor: string;
  width: number;
  x: number;
  y: number;
  dominantBaseline?: string;
  transform?: string;
}
