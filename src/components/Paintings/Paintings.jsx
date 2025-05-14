import React, { useState, useEffect } from "react";
import { fetchArtworks } from "../../utils/api";

function Paintings({ onArtworkClick }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchArtworks();
        setArtworks(data);
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  useEffect(() => {
    const paintingTypes = ["oil", "tempera", "acrylic"];
    const filteredPaintings = artworks.filter((artwork) => {
      const medium = artwork.medium_display
        ? artwork.medium_display.toLowerCase().trim()
        : "";
      return paintingTypes.some((type) => medium.includes(type));
    });

    setFilteredArtworks(filteredPaintings);
  }, [artworks]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Paintings</h2>
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
          <p>No paintings found.</p>
        )}
      </div>
    </section>
  );
}

export default Paintings;
