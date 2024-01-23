import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { State } from "./model.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App state={new State()} />
  </React.StrictMode>
);
