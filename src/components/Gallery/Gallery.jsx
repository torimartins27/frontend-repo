import React from "react";
import "./Gallery.css";

function Gallery({ artworks, onArtworkClick }) {
  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Featured Artworks</h2>
      <div className="gallery">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="gallery-item"
              onClick={() => onArtworkClick(artwork.id)}
            >
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
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
          <p>Loading artworks...</p> // Message in case artwork data hasn't loaded yet
        )}
      </div>
    </section>
  );
}

export default Gallery;
