import type { Theme, PartialTheme } from '../types';
export declare const createTheme: (theme: PartialTheme, baseTheme?: Theme) => Theme;
export declare const createThemes: (themeRecord: {
    [key: string]: PartialTheme;
}) => {
    [key: string]: Theme;
};
//# sourceMappingURL=create-themes.d.ts.map