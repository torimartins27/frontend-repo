import "./Textiles.css";
import React, { useState, useEffect } from "react";

function Textiles({ onArtworkClick }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks?limit=100"
        );
        const data = await response.json();
        setArtworks(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const formTypes = ["tapestry"];
    const filteredTextiles = artworks.filter((artwork) => {
      const medium = artwork.medium_display
        ? artwork.medium_display.toLowerCase().trim()
        : "";
      return formTypes.some((type) => medium.includes(type));
    });

    setFilteredArtworks(filteredTextiles);
  }, [artworks]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Textiles</h2>
      <div className="gallery">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="gallery-item"
              onClick={() => onArtworkClick(artwork.id)}
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
                <p>
                  <strong>Medium:</strong>{" "}
                  {artwork.medium_display || "Not Available"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No textiles found.</p>
        )}
      </div>
    </section>
  );
}

export default Textiles;
