import { HTMLProps, useEffect, useMemo, useState } from "react";
import { State } from "./model";
import { Spinner } from "./Spinner";
import { LED } from "./Led";
import { debounce } from "lodash";
import { isDev } from "./constants";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

export const Connection = observer(
  ({
    state,
    className = "",
    ...rest
  }: HTMLProps<HTMLDivElement> & { state: State }) => {
    const defaultGimbalUrl = useMemo(() => {
      const gimbalUrl = new URL(window.location.href).searchParams.get(
        "gimbal_url"
      );
      return gimbalUrl
        ? gimbalUrl.match(/\d+/)
          ? `http://${gimbalUrl}`
          : gimbalUrl
        : "";
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [url, setUrl] = useState(defaultGimbalUrl);
    const [isBusy, setIsBusy] = useState(false);
    const getState = useMemo(() => {
      return debounce(
        (url: string) => {
          setIsBusy(true);
          state.gimbalUrl = url;
          return state
            .client()
            .getState(url)
            .then(
              action(() => {
                state.gimbalUrl = url.trim();
                state.connected = true;
              })
            )
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
          defaultValue={defaultGimbalUrl}
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
