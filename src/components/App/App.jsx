import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import ArtworkDetail from "../ArtworkDetail/ArtworkDetail";
import Gallery from "../Gallery/Gallery";
import "./App.css";

import { fetchFeaturedArtworks } from "../../utils/api";

import Main from "../Main/Main";

function App() {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArtworks = async () => {
      const data = await fetchFeaturedArtworks();
      setArtworks(data);
    };

    loadArtworks();
  }, []);

  const handleArtworkClick = (id) => {
    navigate(`/artwork/${id}`);
  };

  return (
    <div className="page">
      <div className="page_content">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Gallery
                artworks={artworks}
                onArtworkClick={handleArtworkClick}
              />
            }
          />
          <Route
            path="/artwork/:id"
            element={<ArtworkDetail artworks={artworks} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
