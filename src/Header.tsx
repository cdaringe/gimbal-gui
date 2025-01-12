import { observer } from "mobx-react-lite";
import { LED } from "./Led";
import logo from "./assets/logo.png";
import { isDev } from "./constants";
import { State } from "./model";
import { RestartIcon } from "./RestartIcon";

export const Header = observer(({ state }: { state: State }) => {
  return (
    <header className="shadow flex w-full p-0 justify-center items-center m-0">
      <img className="block flex-initial p-1 h-12 w-12" src={logo} alt="logo" />
      <h1 className="m-0 flex-1">Gimbal IO</h1>
      <ul
        id="menu-items"
        className="flex-1 hidden md:flex gap-2 list-none p-0"
      />
      {state.connected ? (
        <>
          <RestartIcon
            className="m-2 hover:cursor-pointer hover:rotate-90"
            width={30}
            onClick={() => {
              state.client().restart();
            }}
          />
          <LED
            ledColor={
              state.remoteGimbalState.last_error_message ? "yellow" : "green"
            }
            label={state.remoteGimbalState.last_error_message ?? ""}
            onClick={() => {
              if (isDev) {
                state.connected = false;
              }
            }}
          />
        </>
      ) : null}
      <img
        className={"block flex-initial w-12 h-12 rounded-full mx-auto p-1"}
        src={"https://static.cdaringe.com/c/pub/img/headshot.jpeg"}
        alt={"avatar"}
        width={200}
        height={200}
      />
      <div className="block md:hidden">
        <label id="chaboiga">
          <input type="checkbox" />
          <span className="menu">
            <span className="hamburger" />
          </span>
          <ul id="menu-items">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </label>
      </div>
    </header>
  );
});
