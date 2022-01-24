/**
 * Helps prevent error logs blowing up as a result of expecting an error to be thrown,
 * when using a library (such as enzyme).
 * Taken from https://github.com/facebook/jest/issues/5785#issuecomment-769475904
 *
 * @param func Function that you would normally pass to `expect(func).toThrow()`
 */
export declare function expectToThrow(func: () => unknown, error?: JestToErrorArg): void;
declare type JestToErrorArg = Parameters<jest.Matchers<unknown>['toThrow']>[0];
export {};
//# sourceMappingURL=expect-to-throw.d.ts.map