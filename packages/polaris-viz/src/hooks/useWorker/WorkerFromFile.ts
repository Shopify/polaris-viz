export class WorkerFromFile extends Worker {
  worker: any;

  constructor(workerFile) {
    super(workerFile);

    const code = workerFile.toString();
    const blob = new Blob([`(${code})()`]);

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    this.worker = new Worker(URL.createObjectURL(blob));
  }
}
