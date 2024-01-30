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

const App = observer(({ state }: { state: State }) => {
  // const _url = useLocationUrl();

  useEffect(() => {
    if (!state.isFakeStreaming) return;
    const interval = setInterval(() => {
      const [p, t] = ([Math.random(), Math.random()] as const).map((x) =>
        Math.floor(x * 100)
      );
      state.history.push(`GXX M1 R${p} T${t}`);
    }, 1_000);
    return () => {
      clearInterval(interval);
    };
  }, [state.isFakeStreaming]);

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
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col flex-1 h-96 min-w-128">
            <pre className="border-box m-0 flex-1 block w-full block p-2 bg-slate-200 rounded">
              {state.history.join("\n")}
            </pre>
            <div className="flex flex-initial">
              <input className="flex-1" />
              <button>Send</button>
            </div>
          </div>
          <iframe
            className="flex-1 h-96 .min-w-128"
            src="http://localhost:8889/proxied/"
          />
        </div>
        <div className="flex gap-2">
          <div>
            <button
              className="flex-initial"
              disabled={!state.connected}
              onClick={() => {
                state.isFakeStreaming = !state.isFakeStreaming;
              }}
            >
              Stream fake
            </button>
          </div>
        </div>
        <PanTiltControl state={state} />
      </main>
    </div>
  );
});

export default App;
