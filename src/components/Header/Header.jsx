import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import MenuModal from "../MenuModal/MenuModal";

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isNoBgPage =
    location.pathname.startsWith("/artwork") ||
    location.pathname.startsWith("/paintings") ||
    location.pathname.startsWith("/form") ||
    location.pathname.startsWith("/textiles");

  const isHomePage = location.pathname === "/";

  return (
    <header className={`header header--fade-in ${isNoBgPage ? "no-bg" : ""}`}>
      <div className="header__container">
        <Link to="/">
          <img
            className={`header__logo ${isNoBgPage ? "small-logo" : ""}`}
            src={logo}
            alt="Chicago Art Institute Logo"
          />
        </Link>

        {/* Burger Menu (only show if NOT on home page) */}
        {!isHomePage && (
          <>
            <img
              src={burgerMenu}
              alt="Menu"
              className="menu-icon"
              onClick={() => setMenuOpen(true)}
            />
            {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
          </>
        )}
      </div>

      {!isNoBgPage && <h3 className="header__welcome">WELCOME</h3>}
    </header>
  );
}

export default Header;
