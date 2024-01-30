import { HTMLProps, useEffect, useMemo, useState } from "react";
import { State } from "./model";
import { Spinner } from "./Spinner";
import { LED } from "./Led";
import { debounce } from "lodash";
import { isDev } from "./constants";
import { observer } from "mobx-react-lite";

export const Connection = observer(
  ({
    state,
    className = "",
    ...rest
  }: HTMLProps<HTMLDivElement> & { state: State }) => {
    const [url, setUrl] = useState(state.gimbalUrl);
    const [isBusy, setIsBusy] = useState(false);
    const getState = useMemo(() => {
      return debounce(
        (url: string) => {
          setIsBusy(true);
          return state
            .client()
            .getState(url)
            .then((res) => {
              if (
                !res.ok ||
                res.headers.get("content-type") !== "application/json"
              ) {
                throw new Error("unsuccesful gimbal state response");
              }
              return res.json();
            })
            .then((_gimbal) => {
              state.gimbalUrl = url.trim();
              state.connected = true;
            })
            .catch((err) => {
              console.warn(err);
            })
            .finally(() => {
              setIsBusy(false);
            });
        },
        200,
        { trailing: true }
      );
    }, [state]);
    useEffect(() => {
      getState(url);
    }, [url, state, getState]);
    return (
      <div className={`flex gap-2 items-center ${className}`} {...rest}>
        <LED ledColor="red" />
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
        {isDev ? (
          <button
            onClick={() => {
              state.connected = true;
            }}
          >
            Fake connect
          </button>
        ) : null}
      </div>
    );
  }
);
