import { Link } from "react-router-dom";
import "./NavBar.css";
import { Menu } from "./Menu";
import { useState } from "react";

export const NavBar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setClicked(!clicked);
    }
  };
  return (
    <header className="header-nav-container">
      <nav className="nav-list">
        <div className="logo">
          <Link onClick={handleClick} to={"/"}>
            <h1>Football</h1>
          </Link>
        </div>
        <div className={`links ${clicked ? "mobile" : ""}`}>
          <Link onClick={handleClick} to={"/"}>
            home
          </Link>
          <Link onClick={handleClick} to={"Standings"}>
            standings
          </Link>
          <Link onClick={handleClick} to={"Fixture"}>
            fixture
          </Link>
          <button onClick={handleClick} className="menu-close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="menu-mobile">
          <Menu clicked={clicked} handleClick={handleClick} />
        </div>
      </nav>
    </header>
  );
};
