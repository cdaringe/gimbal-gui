import { HTMLProps, useEffect, useState } from "react";
import { State } from "./model";
import { Spinner } from "./Spinner";
import { LED } from "./Led";

export const Connection = ({
  state,
  className = "",
  ...rest
}: HTMLProps<HTMLDivElement> & { state: State }) => {
  const [url, setUrl] = useState(state.gimbalUrl);
  const [isBusy, setIsBusy] = useState(false);
  useEffect(() => {
    setIsBusy(true);
    state
      .client()
      .getState(url)
      .then((res) => {
        if (res.ok) {
          state.gimbalUrl = url.trim();
          state.connected = true;
        }
      })
      .finally(() => {
        setIsBusy(false);
      });
  }, [url, state]);
  return (
    <div className={`flex gap-2 items-center ${className}`} {...rest}>
      <LED />
      <input
        className="h-8 min-w-[18rem] rounded-sm border-blue-500 indent-1 text-blue-900 shadow-lg focus:outline-none focus:ring focus:ring-blue-600"
        type="text"
        placeholder="Gimbal URL"
        onChange={(evt) => {
          setUrl(evt.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          state.connected = !state.connected;
        }}
        className="h-8 pr-4 min-w-6rem rounded-sm border-1 border-blue-800 bg-blue-500 text-blue-50 shadow-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-600"
        disabled={isBusy}
      >
        {isBusy ? <Spinner /> : "Connect"}
      </button>
    </div>
  );
};
