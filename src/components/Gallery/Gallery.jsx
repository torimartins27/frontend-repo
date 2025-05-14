import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Gallery.css";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import MenuModal from "../MenuModal/MenuModal";

function Gallery({ artworks, onArtworkClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });

    if (searchQuery) {
      const filtered = artworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artist_display
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredArtworks(filtered);
    } else {
      setFilteredArtworks(artworks);
    }
  }, [searchQuery, artworks]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(filteredArtworks);
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
            placeholder="Search artworks..."
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
              {artwork.image_id ? (
                <img
                  src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                  alt={artwork.title}
                  className="artwork-image"
                />
              ) : (
                <div className="image-placeholder">Image Not Available</div>
              )}
              <div className="artwork-info">
                <h3>{artwork.title}</h3>
                <p>{artwork.artist_display}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks found for "{searchQuery}"</p> // Message when no artworks match the search query
        )}
      </div>
    </section>
  );
}

export default Gallery;
