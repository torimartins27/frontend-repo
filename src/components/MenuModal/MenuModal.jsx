import { Link } from "react-router-dom";
import "./MenuModal.css";

function MenuModal({ onClose }) {
  return (
    <div className="menu-modal">
      <button className="menu-close" onClick={onClose}>
        &times;
      </button>
      <nav className="menu-nav">
        <Link to="/paintings" onClick={onClose}>
          Paintings
        </Link>
        <Link to="/form" onClick={onClose}>
          Form
        </Link>
        <Link to="/textiles" onClick={onClose}>
          Textiles
        </Link>
      </nav>
    </div>
  );
}

export default MenuModal;
