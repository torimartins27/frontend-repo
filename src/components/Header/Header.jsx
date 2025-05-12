import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Header() {
  return (
    <header className="header header--fade-in">
      <div className="header__container-left">
        <Link to="/">
          <img
            className="header__logo"
            src={logo}
            alt=" Chicago Art Institute Logo"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
