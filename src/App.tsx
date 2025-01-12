import { useEffect } from "react";

import "./assets/normalize.css";
import "./assets/uno.css";
import "./assets/menu.css";
// import { useLocationUrl } from "./hooks/location";
import { State } from "./model";
import { Header } from "./Header";
import { PanTiltControl } from "./PanTiltControl";
import { observer } from "mobx-react-lite";
import { Connection } from "./Connection";
import { action } from "mobx";

const App = observer(({ state }: { state: State }) => {
  return (
    <div
      className="max-w-4xl h-full flex flex-col"
      style={{
        margin: "0 auto",
      }}
    >
      <Header state={state} />
      <main className="p-2">
        {state.connected ? null : <Connection className="mb-2" state={state} />}
        {state.remoteGimbalState.last_error_message ? (
          <div className="p-2 mb-2 w-full border-yellow-800 border-1 rounded bg-yellow-100">
            <h3 className="p-0 m-0">Gimbal error state</h3>
            <p className="m-0 mt-2">
              "{state.remoteGimbalState.last_error_message}". Please restart.
            </p>
          </div>
        ) : null}
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col flex-1 h-96 min-w-128">
            <pre className="border-box m-0 flex-1 block w-full block p-2 bg-slate-200 rounded">
              {state.history.join("\n")}
            </pre>
            <div className="flex flex-initial">
              <input
                id="mangcodeentry"
                onKeyUp={action((evt) => {
                  if (evt.key === "Enter") {
                    state.client().sendGcode(evt.currentTarget.value.trim());
                  }
                })}
                className="flex-1"
              />
              <button>Send</button>
            </div>
          </div>
          <iframe
            className="flex-1 h-96 .min-w-128"
            src="http://localhost:8889/proxied/"
          />
        </div>
        <PanTiltControl state={state} />
      </main>
    </div>
  );
});

export default App;
