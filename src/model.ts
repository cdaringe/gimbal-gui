/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { createDeferred } from "./util/deferred";

export class State {
  gimbalUrl = "";
  connected = false;
  history: string[] = [];
  is_streaming = false;
  manualControlDegrees = { dpan: 5, dtilt: 5 };

  commandQueue = {
    length: 0,
    _q: Promise.resolve(),
  };

  constructor() {
    makeAutoObservable(this);
  }

  enqueCommand<T>(task: () => Promise<T>): Promise<T> {
    this.commandQueue.length += 1;

    const deferred = createDeferred<T>();

    this.commandQueue._q = this.commandQueue._q
      .then(task)
      /**
       * never rejects the queue.
       * consider halting commands until resumed?
       */
      .then(deferred.resolve, deferred.reject)
      .finally(() => {
        this.commandQueue.length -= 1;
      });

    return deferred.promise;
  }

  client() {
    const getState = (url?: string) =>
      this.enqueCommand(() => fetch(`${url ?? this.gimbalUrl}/api/state`));
    return {
      getState,
    };
  }
}
