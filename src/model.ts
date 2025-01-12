/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, makeAutoObservable } from "mobx";
import { createDeferred } from "./util/deferred";

type RemoteGimbalState = {
  pos_steps: [number, number];
  pan_teeth: number;
  tilt_teeth: number;
  pan_drive_teeth: number;
  tilt_drive_teeth: number;
  pan_velocity: number;
  tilt_velocity: number;
  is_home_referenced: boolean;
  is_homing: boolean;
  last_error_message?: string;
};

export class State {
  isHomeReferenced = false;

  remoteGimbalState: RemoteGimbalState = {
    pos_steps: [-Infinity, -Infinity],
    pan_teeth: -Infinity,
    tilt_teeth: -Infinity,
    pan_drive_teeth: -Infinity,
    tilt_drive_teeth: -Infinity,
    pan_velocity: -Infinity,
    tilt_velocity: -Infinity,
    is_home_referenced: false,
    is_homing: false,
  };

  gimbalUrl = "";
  connected = false;
  history: string[] = [];
  isFakeStreaming = false;
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
    const sendGcode = (gcode: string, url?: string) => {
      const next = [...this.history, gcode];
      this.history = next;
      return fetch(`${url ?? this.gimbalUrl}/api/gcode`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ gcode }),
      });
    };

    const getState = (url?: string) =>
      this.enqueCommand(() =>
        fetch(`${url ?? this.gimbalUrl}/api/state`)
          .then((res) => res.json())
          .then(
            action((state) => {
              if (state.ok && state.data) {
                this.remoteGimbalState = state.data;
                return state;
              }
              throw new Error(state.data);
            })
          )
      );

    const gcodeG1 = (
      { pan, tilt }: { pan?: number; tilt?: number },
      url?: string
    ) =>
      this.enqueCommand(() => {
        const gcodeStr = ["G1", pan ? `P${pan}` : "", tilt ? `T${tilt}` : ""]
          .filter(Boolean)
          .join(" ");
        return sendGcode(gcodeStr, url);
      });

    const gcodeG28 = action((url?: string) => {
      const gcodeStr = ["G28"].filter(Boolean).join(" ");
      return sendGcode(gcodeStr, url).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        while (
          !this.remoteGimbalState.is_home_referenced &&
          !this.remoteGimbalState.last_error_message
        ) {
          await this.client().getState(url);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      });
    });

    const restart = (url?: string) =>
      fetch(`${url ?? this.gimbalUrl}/api/restart`);
    return {
      getState,
      gcodeG1,
      gcodeG28,
      sendGcode,
      restart,
    };
  }
}
