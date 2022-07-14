import {useState, useEffect} from 'react';

import {WorkerFromFile} from './WorkerFromFile';

export function useWorker({file, postMessage}) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const instance = new WorkerFromFile(file).worker;
    instance.postMessage(postMessage);
    instance.onmessage = (message: any) => {
      setMessage(message.data);
    };
  }, [file, postMessage]);

  return message;
}
