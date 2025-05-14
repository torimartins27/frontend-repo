import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import striptags from "striptags";
import "./ArtworkDetail.css";

function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworkDetail = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}`
        );
        const data = await response.json();
        setArtwork(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
        setLoading(false);
      }
    };

    fetchArtworkDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!artwork) return <div>Artwork not found.</div>;

  return (
    <div className="artwork-detail">
      <h2>{artwork.title}</h2>
      <p>{artwork.artist_display}</p>
      {artwork.image_id ? (
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/1200,/0/default.jpg`}
          alt={artwork.title}
          className="selectedArtwork-image"
        />
      ) : (
        <div className="image-placeholder">Image Not Available</div>
      )}
      <p>
        <strong>Creation Date:</strong> {artwork.date_display || "Unknown"}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.medium_display || "Not Available"}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {artwork.description
          ? striptags(artwork.description)
          : "No description available."}
      </p>
    </div>
  );
}

export default ArtworkDetail;
