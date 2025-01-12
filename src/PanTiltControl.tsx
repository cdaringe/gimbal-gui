import { useEffect, useMemo, useState } from "react";
import { PadDir } from "./PadDir";
import { State } from "./model";
import { observer } from "mobx-react-lite";
import { Home } from "./icon/Home";
import { action } from "mobx";

const PAD_STYLES = {
  position: "absolute" as const,
  width: 50,
};

const PAD_DIRS = [
  {
    panDir: 0,
    tiltDir: 1,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "0deg",
      left: 40,
    },
  },
  {
    panDir: 1,
    tiltDir: 0,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "90deg",
      right: 0,
      top: 36,
    },
  },
  {
    panDir: 0,
    tiltDir: -1,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "180deg",
      left: 40,
      bottom: 0,
    },
  },
  {
    panDir: -1,
    tiltDir: 0,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "270deg",
      left: 0,
      top: 36,
    },
  },
];

const ANI_OFF = { key: 0, active: false };

export const PanTiltControl = observer(({ state }: { state: State }) => {
  const { dpan, dtilt } = state.manualControlDegrees;
  const [ani, setIsAni] = useState(ANI_OFF);
  const [isKeyMotion, setIsKeyMotion] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsAni(ANI_OFF), 40);
    return () => {
      if (ani.active) {
        clearTimeout(timeout);
        setIsAni(ANI_OFF);
      }
    };
  }, [ani.key, ani.active]);

  const dirHandlers = useMemo(
    () =>
      PAD_DIRS.map(({ panDir, tiltDir }, i) => () => {
        setIsAni({ key: i, active: true });
        state.client().gcodeG1({
          pan: panDir * state.manualControlDegrees.dpan,
          tilt: tiltDir * state.manualControlDegrees.dtilt,
        });
      }),
    [state]
  );

  useEffect(() => {
    if (!isKeyMotion) return;
    const getDir = (evt: KeyboardEvent) => {
      switch (evt.key) {
        case "ArrowUp":
          return 0;
        case "ArrowRight":
          return 1;
        case "ArrowDown":
          return 2;
        case "ArrowLeft":
          return 3;
        default:
          return null;
      }
    };
    const onKeyDown = (evt: KeyboardEvent) => {
      const dir = getDir(evt);
      if (dir === null) return;
      dirHandlers[dir]?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isKeyMotion, dirHandlers]);

  return (
    <div>
      <div className="text-center p-2">
        <Home
          className="shadow-lg m-1 rounded p-2 hover:cursor-pointer hover:shadow-xl"
          width={50}
          onClick={() => {
            state.client().gcodeG28();
          }}
        />
        <br />
        <label htmlFor="home">Home Gimbal</label>
      </div>
      <div className="control-row flex">
        <div className="control-col-1 ">
          <div
            className="m-2"
            style={{
              position: "relative",
              width: "130px",
              height: "130px",
            }}
          >
            {PAD_DIRS.map(({ style }, i) => (
              <PadDir
                {...{
                  key: i,
                  className: `cursor-pointer transition hover:shadow-lg ${ani.key === i && ani.active ? "" : "hover:scale-125"}`,
                  style,
                  onClick: dirHandlers[i]!,
                }}
              />
            ))}
          </div>
          <label className="block" htmlFor="pan">
            {`Pan ${dpan} ° / click`}
          </label>
          <input
            onInput={action((evt) => {
              state.manualControlDegrees.dpan = parseInt(
                evt.currentTarget.value
              );
            })}
            className="block"
            name="pan"
            type="range"
            min="1"
            max="45"
            value={dpan}
          />
          <label className="block" htmlFor="tilt">
            {`Tilt ${dtilt} ° / click`}
          </label>
          <input
            onInput={action((evt) => {
              state.manualControlDegrees.dtilt = parseInt(
                evt.currentTarget.value
              );
            })}
            className="block"
            name="tilt"
            type="range"
            min="1"
            max="45"
            value={dtilt}
          />
        </div>
        <div className="control-col-2">
          <label htmlFor="key-controls">Enable keyboard controls</label>
          <input
            type="checkbox"
            name="key-controls"
            onInput={() => {
              setIsKeyMotion(!isKeyMotion);
            }}
          />
        </div>
      </div>
    </div>
  );
});
