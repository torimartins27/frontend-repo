import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import MenuModal from "../MenuModal/MenuModal";
import burgerMenu from "../../assets/images/burgerMenu.svg";

function Header() {
  const location = useLocation();

  const isNoBgPage =
    location.pathname.startsWith("/artwork") ||
    location.pathname.startsWith("/paintings") ||
    location.pathname.startsWith("/form") ||
    location.pathname.startsWith("/textiles");

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`header header--fade-in ${isNoBgPage ? "no-bg" : ""}`}>
      <div className="header__container">
        <Link to="/">
          <img
            className={`header__logo ${isNoBgPage ? "small-logo" : ""}`}
            src={logo}
            alt=" Chicago Art Institute Logo"
          />
        </Link>
        <img
          src={burgerMenu}
          alt="Menu"
          className="menu-icon"
          onClick={() => setMenuOpen(true)}
        />
      </div>
      {/* <h3 className="header__welcome">WELCOME</h3> */}
      {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Header;
