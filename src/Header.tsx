import logo from "./assets/logo.png";

export const Header = () => {
  return (
    <header className="shadow flex w-full p-0 justify-center items-center m-0">
      <img className="block flex-initial p-1 h-12 w-12" src={logo} alt="logo" />
      <h1 className="m-0 flex-1">Gimbal IO</h1>
      <ul
        id="menu-items"
        className="flex-1 hidden md:flex gap-2 list-none p-0"
      />
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
};
