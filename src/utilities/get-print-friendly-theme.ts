export function getPrintFriendlyTheme({
  isPrinting,
  theme,
}: {
  isPrinting: boolean;
  theme?: string;
}) {
  const darkThemeEnabled = theme === 'Dark' || theme == null;
  return isPrinting && darkThemeEnabled ? 'Light' : theme;
}
