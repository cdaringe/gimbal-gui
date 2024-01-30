import { useEffect, useState } from "react";
import { PadDir } from "./PadDir";
import { State } from "./model";
import { observer } from "mobx-react-lite";

const PAD_STYLES = {
  position: "absolute" as const,
  width: 50,
};

const PAD_DIRS = [
  {
    key: 1,
    panDir: 1,
    tiltDir: 0,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "0deg",
      left: 40,
    },
  },
  {
    key: 2,
    panDir: 0,
    tiltDir: 1,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "90deg",
      right: 0,
      top: 36,
    },
  },
  {
    key: 3,
    panDir: -1,
    tiltDir: 0,
    style: {
      ...PAD_STYLES,
      filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      rotate: "180deg",
      left: 40,
      bottom: 0,
    },
  },
  {
    key: 4,
    panDir: 0,
    tiltDir: -1,
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
  useEffect(() => {
    const timeout = setTimeout(() => setIsAni(ANI_OFF), 40);
    return () => {
      if (ani.active) {
        clearTimeout(timeout);
        setIsAni(ANI_OFF);
      }
    };
  }, [ani.key, ani.active]);

  return (
    <div>
      <div
        className="m-2"
        style={{
          position: "relative",
          width: "130px",
          height: "130px",
        }}
      >
        {PAD_DIRS.map(({ key, tiltDir, panDir, style }) => (
          <PadDir
            {...{
              key,
              className: `cursor-pointer transition hover:shadow-lg ${ani.key === key && ani.active ? "" : "hover:scale-125"}`,
              style,
              onClick: () => {
                setIsAni({ key, active: true });
                state.manualControlDegrees.dpan += panDir * 1;
                state.manualControlDegrees.dtilt += tiltDir * 1;
              },
            }}
          />
        ))}
      </div>
      <label className="block" htmlFor="pan">
        {`Pan ${dpan} ° / click`}
      </label>
      <input
        onInput={(_evt) => {
          // let assert Ok(next_int) = int.parse(next)
          // SetManualControlDegrees(#(next_int, tilt))
        }}
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
        onInput={(_evt) => {
          // let assert Ok(next_int) = int.parse(next)
          // SetManualControlDegrees(#(next_int, tilt))
        }}
        className="block"
        name="tilt"
        type="range"
        min="1"
        max="45"
        value={dtilt}
      />
    </div>
  );
});
