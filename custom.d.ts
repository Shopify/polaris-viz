declare module '*.svg' {
  const content: any;
  // eslint-disable-next-line import/no-default-export
  export default content;
}

declare module 'workerize-loader!*' {
  type FlattenedPromise<T> = unknown extends T
    ? Promise<T>
    : T extends Promise<infer U>
    ? T
    : Promise<T>;

  type AnyFunction = (...args: any[]) => any;
  type Async<F extends AnyFunction> = (
    ...args: Parameters<F>
  ) => FlattenedPromise<ReturnType<F>>;

  type Workerized<T> = Worker &
    {[K in keyof T]: T[K] extends AnyFunction ? Async<T[K]> : never};

  function createInstance<T>(): Workerized<T>;
  export = createInstance;
}
