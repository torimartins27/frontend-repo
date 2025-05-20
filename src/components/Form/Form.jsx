import "./Form.css";
import React, { useState, useEffect } from "react";
import { fetchArtworks } from "../../utils/api";

function Form({ onArtworkClick }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [size, setSize] = useState("843");

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
    const formTypes = [
      "wood",
      "vellum",
      "travertine",
      "leather",
      "stoneware",
      "marble",
      "silver",
      "bronze",
      "iron",
      "earthenware",
    ];

    const filteredForms = artworks.filter((artwork) => {
      const medium = artwork.medium_display
        ? artwork.medium_display.toLowerCase().trim()
        : "";
      return formTypes.some((type) => medium.includes(type));
    });

    const loadImages = async () => {
      const promises = filteredForms.map((artwork) => {
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
      setFilteredArtworks(validArtworks);
    };

    loadImages();
  }, [artworks, size]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Form</h2>
      <div className="gallery">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="gallery-item"
              onClick={() => onArtworkClick(artwork.id)}
            >
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/${size},/0/default.jpg`}
                alt={artwork.title}
                className="artwork-image"
              />
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
          <p>No forms found.</p>
        )}
      </div>
    </section>
  );
}

export default Form;
