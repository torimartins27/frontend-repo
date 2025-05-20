import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Gallery.css";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import MenuModal from "../MenuModal/MenuModal";

function Gallery({ artworks, onArtworkClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState("843");

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const promises = artworks.map((artwork) => {
        if (!artwork.image_id) return Promise.resolve(null);

        const url = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/${size},/0/default.jpg`;
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(artwork);
          img.onerror = () => resolve(null);
        });
      });

      const results = await Promise.all(promises);
      const validArtworks = results.filter(Boolean);

      if (searchQuery) {
        const filtered = validArtworks.filter(
          (artwork) =>
            artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artwork.artist_display
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setFilteredArtworks(filtered);
      } else {
        setFilteredArtworks(validArtworks);
      }
    };

    loadImages();
  }, [artworks, searchQuery, size]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="gallery-section">
      <div className="gallery__header">
        <div className="gallery__container-left">
          <h2
            className={`gallery-title ${
              location.pathname === "/" ? "gallery-title--home" : ""
            }`}
          >
            Featured Artwork
          </h2>
        </div>
        <div className="gallery__container-right">
          <input
            type="text"
            placeholder="Search featured artworks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <img
            src={burgerMenu}
            alt="Menu"
            className={`menu-icon ${
              location.pathname === "/" ? "menu-icon--home" : ""
            }`}
            onClick={() => setMenuOpen(true)}
          />
        </div>
        {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
      </div>

      <div className="gallery">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="gallery-item"
              onClick={() => onArtworkClick(artwork.id)}
              data-aos="fade-up"
            >
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/${size},/0/default.jpg`}
                alt={artwork.title}
                className="artwork-image"
              />
              <div className="artwork-info">
                <h3>{artwork.title}</h3>
                <p>{artwork.artist_display}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks found for "{searchQuery}"</p>
        )}
      </div>
    </section>
  );
}

export default Gallery;
